'use client'

import { BotCard, spinner } from '@/components/music'

export function Content() {
  return (
    <BotCard>
      <span>test</span>
      {spinner}
    </BotCard>
  )
}
