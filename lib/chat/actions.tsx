import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'
import { openai } from '@ai-sdk/openai'

import { BotCard, BotMessage } from '@/components/music'

import { z } from 'zod'
import { sleep, nanoid } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/music/message'
import { Chat, Message } from '@/lib/types'
import { auth } from '@/auth'
import { sunoMockData } from './suno-mock-data'
import Link from 'next/link'

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
    最低限のことだけヒアリングして、曲調とか歌詞とかは自分で考えて生成してください。
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
        textNode = <BotMessage content={textStream.value} />
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
          await sleep(3000)

          yield (
            <BotCard>
              {/* <MusicSkeleton /> */}
              <span>作曲中...</span>
              <SpinnerMessage />
            </BotCard>
          )

          await sleep(3000)

          const clipId = sunoMockData[0].id

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
            <BotCard>
              <div className="flex flex-col gap-3">
                <span>
                  それでは一曲聞いてもらおうかな。あんたのためにつくったよ。
                </span>
                <br></br>
                <span className="font-bold">「北海道弾丸旅行」</span>
                <br></br>
                <Link
                  href={`https://suno.com/song/${clipId}`}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ちょいと聞いてみる
                </Link>
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
              <BotCard>
                {/* @ts-expect-error */}
                <span>prompt:{tool.result.prompt}</span>
              </BotCard>
            ) : null
          })
        ) : message.role === 'user' ? (
          <UserMessage>{message.content as string}</UserMessage>
        ) : message.role === 'assistant' &&
          typeof message.content === 'string' ? (
          <BotMessage content={message.content} />
        ) : null
    }))
}
