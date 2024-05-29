'use client'
import { Song } from '@/app/definition'
import Image from 'next/image'
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function SongComponent({
  song: { id, title, image_url, lyric, audio_url }
}: {
  song: Song
}) {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio(audio_url))
  const togglePlay = () => {
    if (isPlaying) {
      audio.pause()
      console.log('paused')
      setIsPlaying(false)
    } else {
      audio.play()
      console.log('playing')
      setIsPlaying(true)
    }
  }

  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white ">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center">
          <Image
            alt="Album Cover"
            className="rounded-lg shadow-lg object-cover"
            height={200}
            src={image_url}
            width={200}
          />
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="text-white  rounded-full p-2" onClick={togglePlay}>
            {isPlaying ? (
              <PauseIcon className="w-8 h-8" />
            ) : (
              <PlayIcon className="w-8 h-8" />
            )}
          </button>
        </div>
        <div className="prose prose-invert text-center">
          <div className="prose-p:my-2">
            {lyric.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
