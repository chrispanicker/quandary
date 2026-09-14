'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Media } from './media'

type Props = {
  work?: any
  isMediaGallery?: boolean
  index?: number
}

export const Thumbs = ({ work, isMediaGallery = false, index }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const title = isMediaGallery ? work?.label || work?.title : work?.title

  const mediaType = isMediaGallery
    ? work?.type || 'image'
    : work?.heroMedia?.type || 'image'

  const mediaSource = isMediaGallery
    ? mediaType === 'video'
      ? work?.video?.asset?.playbackId || ''
      : work?.image?.asset?.url || ''
    : mediaType === 'video'
      ? work?.heroMedia?.video?.asset?.playbackId || ''
      : work?.heroMedia?.image?.asset?.url || ''

  const href = work?.slug ? `/projects/${work.slug}` : undefined

  const handleClick = () => {
    if (isMediaGallery && typeof index === 'number') {
      const params = new URLSearchParams(searchParams.toString())
      params.set('i', String(index))
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      return
    }

    if (href) router.push(href, { scroll: true })
  }

  return (
    <div
      onClick={handleClick}
      className={`group ${href || (isMediaGallery && typeof index === 'number') ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <Media
        size="small"
        type={mediaType}
        source={mediaSource}
        title={title}
      />
      {!isMediaGallery && (
        <h3 className="text-sm text-left mt-1">{title}</h3>
      )}
    </div>
  )
}