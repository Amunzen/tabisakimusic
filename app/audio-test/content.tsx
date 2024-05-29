'use client'
import { useRef } from 'react'

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  return (
    <div>
      <audio
        ref={audioRef}
        src="https://cdn1.suno.ai/357c8cb0-28ac-4a75-b52a-c886489bd823.mp3"
      />
      <button onClick={handlePlay}>Play</button>
    </div>
  )
}

export default function Page() {
  return (
    <div className="bg-white">
      <span>audio</span>
      <AudioPlayer />
    </div>
  )
}
