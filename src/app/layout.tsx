import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import ProgressBarProvider from "@/components/ProgressBar";

export const metadata: Metadata = {
  title: "Nelvy Holares",
  description: "Created by NextJS + Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ProgressBarProvider>
        <SideBar>{children}</SideBar>
        </ProgressBarProvider>
      </body>
    </html>
  );
}
