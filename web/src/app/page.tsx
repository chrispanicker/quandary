import { Suspense } from "react";
import { client } from "../../lib/client";
import { siteSettingsQuery } from "../../lib/queries";
import { cGrid } from "./components/classes";
import { HeroGallery } from "./components/hero-gallery";
import { Thumbs } from "./components/thumbs";

const settings = await client.fetch(siteSettingsQuery)
const selectedWorks = settings?.selectedWorks

export default function Home() {
  return (
    <div className={`w-full h-full md:pt-auto pt-16`}>    

      <Suspense fallback={null}>
        <HeroGallery array={selectedWorks} />
      </Suspense>

      <div className={`${cGrid} pt-16`}>
        <h3 className={`text-sm text-right col-span-1`}>Selected Work</h3>
        <div className={`md:col-span-4 col-span-5 grid grid-cols-2 gap-y-4 gap-x-2 md:grid-cols-4`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Suspense key={i} fallback={null}>
              <Thumbs work={selectedWorks?.[i]} isMediaGallery={false} />
            </Suspense>
          ))}
        </div>
      </div>

      <div className={`${cGrid} pt-16`}>
        <h3 className={`text-sm text-right col-span-1`}>Bio</h3>
        <p className={`md:col-span-3 col-span-5 md:text-3xl text-lg md:mr-auto mr-4`}>
          {settings?.bio}
        </p>

        <h3 className={`text-sm text-right col-span-1`}>Awards & Press:</h3>
        <div className={`md:col-span-1 col-span-5 md:text-3xl text-lg md:mr-24 mr-12`}>
          {settings?.awardsAndPress?.map((item: string, index: number) => (
            <p key={index} className={`text-lg`}>{item}</p>
          ))}
        </div>
      </div>  

    </div>
  );
}
