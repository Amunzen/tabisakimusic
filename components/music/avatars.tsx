import { validateMode } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'

export function AssistantAvatar({ mode }: { mode: string }) {
  let path = ''
  const validatedMode = validateMode(mode)
  switch (validatedMode) {
    case 'tsugihime':
      path = 'tsugihime.webp'
      break
    case 'bujigaeru':
      path = 'bujigaeru.webp'
      break
    case 'kojiro':
      path = 'kojiro.webp'
      break
    case 'otsugiyama':
      path = 'otsugiyama.webp'
      break
    default:
      path = 'tsugihime.webp'
      break
  }
  return (
    <Avatar>
      <AvatarImage src={`/${path}`} alt="Assistant" />
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  )
}
