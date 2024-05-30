export const maxDuration = 300 // Applies to the actions

import { nanoid, validateMode } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

export const metadata = {
  title: '旅先コンシェルジュ 楽曲生成モードβ版'
}

export default async function IndexPage({
  params: { mode }
}: {
  params: {
    mode: string
  }
}) {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  const validatedMode = validateMode(mode)

  return (
    <div className="pt-10">
      <AI
        initialAIState={{
          chatId: id,
          messages: [{ id: 'test', role: 'assistant', content: 'こんにちは' }],
          mode: validatedMode
        }}
      >
        <Chat id={id} session={session} missingKeys={missingKeys} />
      </AI>
    </div>
  )
}
