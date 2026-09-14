'use client'

import { useEffect, useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'

type Props = {
  size: 'large' | 'small'
  type: 'image' | 'video'
  source: string
  title?: string
}

export const Media = ({ size, type, source, title = 'Project video' }: Props) => {
  const [displaySource, setDisplaySource] = useState(source)
  const [displayType, setDisplayType] = useState(type)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!source) return

    if (displaySource === source && displayType === type) {
      setIsVisible(true)
      return
    }

    setIsVisible(false)

    const timeoutId = setTimeout(() => {
      setDisplayType(type)
      setDisplaySource(source)
      setIsVisible(true)
      setIsLoaded(false)
    }, 180)

    return () => clearTimeout(timeoutId)
  }, [source, type, displaySource, displayType])

  useEffect(() => {
    if (displayType !== 'image' || !displaySource) return

    setIsLoaded(false)

    const img = new Image()
    img.decoding = 'async'
    img.src = displaySource

    const markLoaded = () => {
      if (displaySource === source && displayType === type) {
        setIsLoaded(true)
      }
    }

    img.onload = markLoaded
    img.onerror = markLoaded

    if (img.complete) {
      markLoaded()
    }

    if (img.decode) {
      img
        .decode()
        .then(markLoaded)
        .catch(markLoaded)
    }
  }, [displaySource, displayType, type, source])

  if (!displaySource) return null

  const opacityClass = isVisible && isLoaded ? 'opacity-100' : 'opacity-0'

  return (
    <div className={`overflow-hidden bg-gray-100 transition-opacity duration-500 ease-in-out ${size === 'large' ? 'col-span-5' : 'col-span-2 hover:opacity-60'} aspect-[4/3]`}>
      {displayType === 'image' ? (
        <img
          key={displaySource}
          src={displaySource}
          alt=""
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`w-full h-full object-contain transition-opacity duration-500 ease-in-out bg-gray-100 ${opacityClass}`}
        />
      ) : (
        <MuxPlayer
          key={displaySource}
          autoPlay
          loop
          muted
          playsInline
          playbackId={displaySource}
          metadata={{ video_title: title }}
          accentColor="#ffffff"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-contain bg-gray-100 transition-opacity duration-500 ease-in-out rounded-2xl bg-gray-100 ${opacityClass}`}
          style={{ width: 'auto', height: '100%', display: 'block', '--controls': 'none', '--media-object-fit': 'contain', '--media-background-color': '#f3f4f6' }}
        />
      )}
    </div>
  )
}