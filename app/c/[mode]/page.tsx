import { nanoid, validateMode } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

export const metadata = {
  title: '旅先みゅーじっく'
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
    <div className="pt-32">
      {/* <EmptyScreen /> */}
      <AI initialAIState={{ chatId: id, messages: [], mode: validatedMode }}>
        <Chat id={id} session={session} missingKeys={missingKeys} />
      </AI>
    </div>
  )
}
