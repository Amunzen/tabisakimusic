import { validateMode } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

export function AssistantAvatar({ mode }: { mode: string }) {
  let path = ''
  const validatedMode = validateMode(mode)
  switch (validatedMode) {
    case 'tsugihime':
      path = 'tsugihime.png'
      break
    case 'bujigaeru':
      path = 'bujigaeru.png'
      break
    case 'kojiro':
      path = 'kojiro.png'
      break
    case 'otsugiyama':
      path = 'otsugiyama.png'
      break
    default:
      path = 'tsugihime.png'
      break
  }
  return (
    <Avatar>
      <AvatarImage src={`/${path}`} alt="Assistant" />
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  )
}
