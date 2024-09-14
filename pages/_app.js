import "@/styles/globals.css";
import React from "react";
import { Montserrat } from "next/font/google";
import Header from "@/components/Header";

const inter = Montserrat({ subsets: ["latin"], weight: "400" });

export default function App({
  Component,
  pageProps
}) {
  return (
    <main
      className={`${inter.className} min-h-screen max-w-screen-2xl mx-auto bg-background text-text`}
    >
      <Header />
      <Component {...pageProps} />
    </main>
  );
}
