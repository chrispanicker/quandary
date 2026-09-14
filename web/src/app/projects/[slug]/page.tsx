import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { client } from '../../../../lib/client'
import { projectBySlugQuery } from '../../../../lib/queries'
import { cGrid } from '@/app/components/classes'
import { Media } from '@/app/components/media'
import { HeroGallery } from '@/app/components/hero-gallery'
import { Thumbs } from '@/app/components/thumbs'


type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  const project = await client.fetch(projectBySlugQuery, { slug })

  if (!project) {
    notFound()
  }

  return (
    <div className={`w-full h-full md:pt-auto pt-8`}>    
      <div className={`${cGrid} pt-8`}>
        <h3 className={`text-sm md:text-right`}>Name</h3>
        <p className={`md:col-span-4 col-span-6 md:text-6xl text-3xl md:mr-24`}>
          {project?.title}
        </p>
      </div>  

      <Suspense fallback={null}>
        <HeroGallery array={project?.mediaGallery} isMediaGallery={true} />
      </Suspense>

      <div className={`${cGrid} pt-16`}>
        <h3 className={`text-sm text-right`}>Media</h3>
        <div className={`md:col-span-4 col-span-5 grid md:grid-cols-8 grid-cols-2 gap-y-4 gap-x-2`}>
          {Array.from({ length: project?.mediaGallery?.length || 0 }).map((_, i) => (
            <Suspense key={i} fallback={null}>
              <Thumbs work={project?.mediaGallery?.[i]} isMediaGallery={true} index={i} />
            </Suspense>
          ))}
        </div>
      </div>

      
      <div className={`${cGrid} pt-16`}>
        <h3 className={`text-sm text-right`}>Description</h3>
        <p className={`md:col-span-4 col-span-5 md:text-3xl text-lg md:mr-24 mr-12`}>
          {project?.description}
        </p>
      </div>  

    
    </div>
  )
}