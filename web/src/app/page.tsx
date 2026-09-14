import { Suspense } from "react";
import { client } from "../../lib/client";
import { siteSettingsQuery } from "../../lib/queries";
import { cGrid, largeText, mediumText, extraSmallText, smallText } from "./components/classes";
import { HeroGallery } from "./components/hero-gallery";
import { Thumbs } from "./components/thumbs";
import { AsciiText } from "./components/ascii";

const settings = await client.fetch(siteSettingsQuery)
const selectedWorks = settings?.selectedWorks

export default function Home() {
  return (
    <div className={`w-full h-full pt-0`}>    
     <div className={`${cGrid} md:pt-8 pt-12`}>
      <h1 className={`${largeText} md:col-span-4 col-span-6 md:col-start-2`}>Chris Panicker is a New-York-based designer.</h1>
      {/* <AsciiText text="Chris Panicker is a New-York-based designer." className={`${largeText} md:col-span-4 col-span-6 md:col-start-2`} /> */}
     </div>

      <Suspense fallback={null}>
        <HeroGallery array={selectedWorks} />
      </Suspense>

      <div className={`${cGrid} pt-16`}>
        <h3 className={`${extraSmallText} md:text-right col-span-1`}>Selected Work</h3>
        <div className={`md:col-span-4 col-span-5 grid grid-cols-2 gap-y-4 md:grid-cols-4 w-full`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Suspense key={i} fallback={null}>
              <Thumbs work={selectedWorks?.[i]} isMediaGallery={false} />
            </Suspense>
          ))}
        </div>
      </div>

      <div className={`${cGrid} pt-16`}>
        <h3 className={`${extraSmallText} md:text-right col-span-1`}>Bio</h3>
        <p className={`md:col-span-3 col-span-5 ${mediumText} md:mr-auto mr-4`}>
          {settings?.bio}
        </p>
        {/* <AsciiText text={settings?.bio} className={`md:col-span-3 h-auto col-span-5 ${mediumText}`} /> */}

        <h3 className={`${extraSmallText} md:text-right col-span-1 md:pt-0 pt-16`}>Awards & Press:</h3>
        <div className={`md:col-span-1 col-span-5 ${smallText} md:mr-auto mr-12 md:pt-0 pt-16`}>
          {settings?.awardsAndPress?.map((item: string, index: number) => (
            <p key={index} className={``}>{item}</p>
          ))}
        </div>
      </div>  

    </div>
  );
}
