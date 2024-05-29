import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'

export interface ChatList {
  messages: UIState
  session?: Session
  isShared: boolean
}

export function ChatList({ messages, session, isShared }: ChatList) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl rounded-[20px] p-10 px-20 backdrop-blur-lg bg-black/30">
      {messages.map((message, index) => (
        <div key={message.id} className="">
          {message.display}
          {index < messages.length - 1 && (
            <Separator className="my-4 bg-gray-600" />
          )}
        </div>
      ))}
    </div>
  )
}
