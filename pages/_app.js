import "@/styles/globals.css";
import React from "react";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"], weight: "400" });

export default function App({
  Component,
  pageProps
}) {
  return (
    <main
      className={`${inter.className} min-h-screen bg-background text-text`}
    >
      <Component {...pageProps} />
    </main>
  );
}
