'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cGrid } from './classes'
import { Media } from './media'

type Props = {
  array?: any[]
  isMediaGallery?: boolean
}

export const HeroGallery = ({ array = [], isMediaGallery = false }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (!array.length) return null

  const rawIndex = Number(searchParams.get('i') ?? '0')
  const safeIndex = Number.isNaN(rawIndex) ? 0 : Math.max(0, Math.min(rawIndex, array.length - 1))
  const currentWork = array[safeIndex] ?? array[0]

  const title = isMediaGallery ? currentWork?.label || currentWork?.title : currentWork?.title

  const mediaType = isMediaGallery
    ? currentWork?.type || 'image'
    : currentWork?.heroMedia?.type || 'image'

  const mediaSource = isMediaGallery
    ? mediaType === 'video'
      ? currentWork?.video?.asset?.playbackId || ''
      : currentWork?.image?.asset?.url || ''
    : mediaType === 'video'
      ? currentWork?.heroMedia?.video?.asset?.playbackId || ''
      : currentWork?.heroMedia?.image?.asset?.url || ''

  const updateIndex = (nextIndex: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('i', String(nextIndex))

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const goPrev = () => {
    const nextIndex = (safeIndex - 1 + array.length) % array.length
    updateIndex(nextIndex)
  }

  const goNext = () => {
    const nextIndex = (safeIndex + 1) % array.length
    updateIndex(nextIndex)
  }

  return (
    <div className={`${cGrid} md:pt-8 pt-4`}>
      <h3 className="text-sm md:text-right col-span-6 md:col-span-1">Preview</h3>
      <div className="relative w-full h-full col-span-6 md:col-span-5 group bg-black">
        {/* <h3 className="text-5xl text-black absolute bottom-4 left-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {title}
        </h3> */}

        <div
          className="absolute left-0 w-[20%] h-full bg-linear-to-r from-white to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-40 cursor-w-resize"
          onClick={()=>{setTimeout(goPrev, 500)}}
        />

        <div
          className="absolute right-0 w-[20%] h-full bg-linear-to-r from-transparent to-white opacity-0 hover:opacity-100 transition-opacity duration-500 z-40 cursor-e-resize"
          onClick={()=>{setTimeout(goNext, 500)}}
        />

        <Media
          size="large"
          type={mediaType}
          source={mediaSource}
          title={title}
        />
      </div>
    </div>
  )
}