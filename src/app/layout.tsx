import type { Metadata } from "next";
import "./globals.css";
import ProgressBarProvider from "@/components/ProgressBar";
import { Toaster } from "@/components/ui/sonner";
import NavigationBar from "@/components/NavigationBar";

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
          <NavigationBar>{children}</NavigationBar>
        </ProgressBarProvider>
        <Toaster />
      </body>
    </html>
  );
}
