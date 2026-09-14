import type { Metadata } from "next";
import "./globals.css";
import { cGrid, mediumText, extraSmallText, smallText } from "./components/classes";

export const metadata: Metadata = {
  title: "Chris Panicker",
  description: "Chris Panicker is a New York-based designer and developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`mt-8 md:mb-16 mb-32 mx-8 serif scroll-smooth`}>
      <head><link rel="stylesheet" href="https://use.typekit.net/kaq6rbu.css"></link></head>
      <body className="tk-times-new-roman text-black w-full h-full">
        <header className={`${cGrid} w-screen fixed md:top-16 top-8 z-10`}>
          <a href="/" className={`md:text-right ${extraSmallText} md:pr-2`}>Chris Panicker</a>
        </header>
        {children}
        <footer className={`${cGrid} ${extraSmallText} pt-16`}>
          <h3 className={`col-start-1 text-right`}>Contact</h3>
          <h1 className={`col-start-2 ${smallText}`}>chris@panicker.design<br></br>@chrispanicker</h1>
          {/* <h3 className={`${mediumText}`}>©2026 Chris Panicker</h3> */}
        </footer>
      </body>
    </html>
  );
}
