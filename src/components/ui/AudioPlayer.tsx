'use client'

import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  src: string
}

interface AudioPlayerProps {
  tracks: Track[]
  currentTrackIndex?: number
  onTrackChange?: (index: number) => void
}

export default function AudioPlayer({ tracks, currentTrackIndex = 0, onTrackChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleNext)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleNext)
    }
  }, [currentTrackIndex])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePrevious = () => {
    const newIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1
    onTrackChange?.(newIndex)
  }

  const handleNext = () => {
    const newIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0
    onTrackChange?.(newIndex)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (parseFloat(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (!currentTrack) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background-secondary border border-dark-800 rounded-2xl p-6"
    >
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Track Info */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">{currentTrack.title}</h3>
        <p className="text-dark-400">{currentTrack.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
          className="w-full h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-sm text-dark-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-2 text-dark-400 hover:text-neon-green transition-colors duration-200"
          >
            <SkipBack className="h-5 w-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="p-3 bg-gradient-neon rounded-full text-black hover:shadow-lg hover:shadow-neon-green/25 transition-all duration-200"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2 text-dark-400 hover:text-neon-green transition-colors duration-200"
          >
            <SkipForward className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="p-2 text-dark-400 hover:text-neon-green transition-colors duration-200"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </motion.button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume * 100}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-dark-800 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

    </motion.div>
  )
}
