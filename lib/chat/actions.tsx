import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import { BotCard, BotMessage, spinner } from '@/components/music'

import { z } from 'zod'
import { nanoid, validateMode } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import {
  SpinnerMessage,
  SystemMessage,
  UserMessage
} from '@/components/music/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { SongsSchema } from '@/app/definition'
import SongComponent from '@/components/music/song2'

function getModeScript(mode: string) {
  const validatedMode = validateMode(mode)
  switch (validatedMode) {
    case 'otsugiyama':
      return 'あなたは「お次山」という江戸時代の女性の人格として回答してください。お風呂をこよなく愛している、お相撲さんのような体格の人です。'
    case 'bujigaeru':
      return 'あなたは「ブシガエル」というカエルの人格として、語尾にケロがつくようにしてください。ダジャレ好きの明るい蛙です。'
    case 'tsugihime':
      return 'あなたは「つぎひめ」という江戸時代の女性の人格として、回答してください。良家の娘で美味しいご飯が大好きです。'
    case 'kojiro':
      return 'あなたは「小次郎」という江戸時代の男性の人格として、回答してください。子連れ旅行に強い、子供です。内緒話が大好き。'
  }
}

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: openai('gpt-4o'),
    initial: <SpinnerMessage />,
    system: `
    あなたは東急の定額泊まり放題サービス「Tsugitsugi」の「旅先ミュージック」のアシスタントです。
    どんな場所でどんなことをしたかなど、ユーザーに旅の思い出を聞いて、それに合った音楽を生成してください。
    江戸時代の「流し」みたいな人格でお願い。口調とかもべらんめえ口調の江戸弁で。
    最低限のことだけヒアリングして、曲調とか歌詞とかは自分でなるべく考えてどんどん生成してください。
    
    ${getModeScript(aiState.get().mode || 'otsugiyama')}
    `,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = (
          <BotMessage content={textStream.value} mode={aiState.get().mode} />
        )
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            }
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    },
    tools: {
      generateMusic: {
        description: 'Generate music',
        parameters: z.object({ prompt: z.string() }),
        generate: async function* ({ prompt }) {
          yield (
            <SystemMessage>
              <span>作曲中。数十秒ほどかかることがあります。</span>
              {spinner}
            </SystemMessage>
          )
          const url = 'https://suno-api-opal-alpha.vercel.app/api/generate'

          let result: any = {}
          try {
            result = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt, wait_audio: true })
            }).then(res => res.json())
          } catch (error) {
            console.error(error)
            return (
              <SystemMessage>
                エラーが発生しました。恐れ入りますが、画面を更新し、再度実行してください。
              </SystemMessage>
            )
          }

          console.log('result', result)
          const validatedResult = SongsSchema.parse(result)
          const song = validatedResult[0]
          console.log('song', song)

          const clipId = song.id

          const toolCallId = nanoid()

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: [
                  {
                    type: 'tool-call',
                    toolName: 'generateMusic',
                    toolCallId,
                    args: { prompt, clipId }
                  }
                ]
              },
              {
                id: nanoid(),
                role: 'tool',
                content: [
                  {
                    type: 'tool-result',
                    toolName: 'generateMusic',
                    toolCallId,
                    result: { prompt, clipId }
                  }
                ]
              }
            ]
          })

          return (
            <BotCard mode={aiState.get().mode}>
              <div className="flex flex-col gap-3">
                <span>
                  それでは一曲聞いてもらおうかな。あんたのためにつくったよ。
                </span>
                <SongComponent song={song} />
              </div>
            </BotCard>
          )
        }
      }
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: Message[]
  mode?: string
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: [], mode: 'otsugiyama' },
  onGetUIState: async () => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const aiState = getAIState()

      if (aiState) {
        const uiState = getUIStateFromAIState(aiState)
        return uiState
      }
    } else {
      return
    }
  },
  onSetAIState: async ({ state }) => {
    'use server'

    const session = await auth()

    if (session && session.user) {
      const { chatId, messages } = state

      const createdAt = new Date()
      const userId = session.user.id as string
      const path = `/chat/${chatId}`

      const firstMessageContent = messages[0].content as string
      const title = firstMessageContent.substring(0, 100)

      const chat: Chat = {
        id: chatId,
        title,
        userId,
        createdAt,
        messages,
        path
      }

      await saveChat(chat)
    } else {
      return
    }
  }
})

export const getUIStateFromAIState = (aiState: Chat) => {
  return aiState.messages
    .filter(message => message.role !== 'system')
    .map((message, index) => ({
      id: `${aiState.chatId}-${index}`,
      display:
        message.role === 'tool' ? (
          message.content.map(tool => {
            return tool.toolName === 'generateMusic' ? (
              <BotCard mode={aiState.mode}>
                {/* @ts-expect-error */}
                <span>prompt:{tool.result.prompt}</span>
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} mode={aiState.mode} />
        ) : null
    }))
}
