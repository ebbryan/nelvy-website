"use client";

import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { useRouter } from "@bprogress/next";

const NavigationBar = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <nav
        className={`flex items-center justify-between py-4 px-6 md:px-16 fixed w-full 
              bg-white/30 backdrop-blur-lg border-b border-white/20`}
      >
        <h1
          className="text-3xl hover:cursor-pointer font-bold"
          onClick={() => router.push("/")}
        >
          Nelvy.<span className="text-green-400">io</span>
        </h1>
        <Button size={"lg"} variant={"secondary"}>
          Let&apos;s Talk
        </Button>
      </nav>
      <main className="flex flex-col items-center justify-center h-screen">
        {children}
      </main>
    </>
  );
};

export default NavigationBar;
