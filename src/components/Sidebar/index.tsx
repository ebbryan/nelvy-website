"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const SideBarMenu = ({
  onNavigate,
  onClose,
}: {
  onNavigate: (path: string) => void;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const path = usePathname();
  const menuItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "My Resume", path: "/resume" },
    // { id: 3, title: "Contact Me", path: "/contact-me" },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Close button (mobile only) */}
      <div className="w-full flex justify-end md:hidden">
        <button onClick={onClose} className="p-2">
          <X size={28} />
        </button>
      </div>

      <h1
        className="text-3xl hover:cursor-pointer font-bold"
        onClick={() => router.push("/")}
      >
        Nelvy
      </h1>

      <div className="flex flex-col items-center justify-center gap-2 w-full">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            size="lg"
            variant={path === item.path ? "default" : "secondary"}
            className="w-full py-6"
            onClick={() => {
              onNavigate(item.path);
              if (onClose) onClose(); // close sidebar after navigation (on mobile)
            }}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

const SideBar = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <main className="flex h-screen relative">
      {/* Mobile toggle button (shows when sidebar is closed) */}

      {!isOpen && (
        <button
          className="md:hidden p-4 absolute top-2 left-2 z-50 bg-white rounded shadow"
          onClick={toggleSidebar}
        >
          <Menu size={28} />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40 h-full bg-white shadow-lg p-4 
          w-8/12 sm:w-6/12 md:w-2/6 lg:w-1/6 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <SideBarMenu onNavigate={navigate} onClose={() => setIsOpen(false)} />
      </aside>

      {/* Main content */}
      <section className="w-full overflow-auto p-6">{children}</section>
    </main>
  );
};

export default SideBar;
