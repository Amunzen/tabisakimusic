import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'

export const metadata = {
  title: '旅先みゅーじっく'
}

function validateMode(mode: string) {
  if (!['otsugiyama', 'bushigaeru'].includes(mode)) {
    return 'otsugiyama'
  }
  return mode
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
    <div>
      <span>{validatedMode}</span>
      <AI initialAIState={{ chatId: id, messages: [], mode: validatedMode }}>
        <Chat id={id} session={session} missingKeys={missingKeys} />
      </AI>
    </div>
  )
}
