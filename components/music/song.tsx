'use client'
import React, { useState } from 'react'
import { Song } from '@/app/definition'
import Image from 'next/image'

interface SongProps {
  song: Song
}

export const SongComponent: React.FC<SongProps> = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    const audio = new Audio(song.audio_url)
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="max-w-xl mx-auto border rounded-lg shadow-lg bg-white">
      <Image
        height={100}
        width={100}
        src={song.image_url}
        alt={song.title}
        // className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold">{song.title}</h2>
        <p className="text-gray-600  whitespace-pre-line">{song.lyric}</p>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
    </div>
  )
}
