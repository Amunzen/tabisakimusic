'use client'
import { Song } from '@/app/definition'
import Image from 'next/image'
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
    <div className="sm:flex items-top justify-evenly text-white pt-4 -ml-16">
      <div className="flex flex-col items-center gap-4">
        <Image
          alt="Album Cover"
          className="rounded-lg shadow-lg bg-blue-200 object-cover"
          height={200}
          src={image_url}
          width={200}
        />
        <div className="flex justify-center">
          <button className="text-white rounded-full p-2" onClick={togglePlay}>
            {isPlaying ? (
              <div className="flex items-center gap-2">
                <PauseIcon className="w-8 h-8" />
                <span>Stop</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <PlayIcon className="w-8 h-8" />
                <span>Play</span>
              </div>
            )}
          </button>
        </div>
      </div>
      <div>
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        <div className="prose prose-invert text-center">
          <div className="prose-p:my-1">
            {lyric.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center pt-10">
          <Link
            href={`https://cdn1.suno.ai/${id}.mp4`}
            className={cn(buttonVariants({ variant: 'default' }))}
            target="_blank"
          >
            曲をダウンロード
          </Link>
        </div>
      </div>
    </div>
  )
}
