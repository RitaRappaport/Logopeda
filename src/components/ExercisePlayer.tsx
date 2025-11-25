/// DOCS:
/// ExercisePlayer — odtwarzacz ćwiczeń audio z interaktywnym interfejsem.

import React, { useEffect, useRef, useState } from 'react'

interface ExercisePlayerProps {
  audioUrl: string
  label: string
}

export default function ExercisePlayer({
  audioUrl,
  label,
}: ExercisePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-slate-200 hover:border-primary transition">
      <button
        onClick={togglePlay}
        className="p-2 bg-primary text-white rounded-full hover:opacity-90 transition"
        aria-label={isPlaying ? 'Wstrzymaj' : 'Odtwórz'}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <audio ref={audioRef} src={audioUrl} />
      </div>
      <span className="text-slate-400">🔊</span>
    </div>
  )
}
