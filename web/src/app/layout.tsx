import type { Metadata } from "next";
import "./globals.css";
import { cGrid } from "./components/classes";

export const metadata: Metadata = {
  title: "Chris Panicker",
  description: "Chris Panicker is a New York-based designer and developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`mt-8 md:mb-16 mb-32 mx-8 serif scroll-smooth`}>
      <head><link rel="stylesheet" href="https://use.typekit.net/kaq6rbu.css"></link></head>
      <body className="tk-times-new-roman tracking-[-0.01rem] leading-[1.2rem] text-black">
        <header className={`${cGrid} w-full fixed md:top-16 top-8`}>
          <a href="/" className="col-span-5 text-sm">
            Chris Panicker
          </a>
        </header>
        {children}
        <footer className={`${cGrid} w-full pt-16`}>
          <h3 className="text-sm text-right">Contact</h3>
          <h1 className="col-span-4 text-xl">chris@panicker.design<br></br>@chrispanicker</h1>
          <h3 className="text-sm">©2026 Chris Panicker</h3>
        </footer>
      </body>
    </html>
  );
}
