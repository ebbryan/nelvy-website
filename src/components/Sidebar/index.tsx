"use client";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";

const SideBarMenu = () => {
  const router = useRouter();
  const path = usePathname();
  const menuItems = [
    { id: 1, title: "About Nelvy", path: "/about-nelvy" },
    { id: 2, title: "Resume", path: "/resume" },
    { id: 3, title: "Contact Me", path: "/contact-me" },
  ];
  const onNavigate = (path: string) => router.push(path);
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl">Nelvy O. Holares</h1>
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        {menuItems.map((item) => (
          <Button
            size={"lg"}
            variant={`${path === item.path ? "default" : "secondary"}`}
            className="w-full py-6"
            key={item.id}
            onClick={() => onNavigate(item.path)}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

const SideBar = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen">
      <aside className="w-2/12 p-4">
        <SideBarMenu />
      </aside>
      <section className="w-full overflow-auto p-5">{children}</section>
    </main>
  );
};

export default SideBar;
