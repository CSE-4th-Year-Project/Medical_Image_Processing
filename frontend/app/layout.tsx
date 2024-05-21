import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Home, LayoutDashboard, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Medical Application",
  description: "Image Processing Website Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            <nav className="navbar fixed w-full h-14 top-0 left-0 z-10 flex justify-between bg-pink-200 dark:bg-pink-800 items-center gap-5 px-5 py-3">
              <Link href="/">
                <Button variant="outline" size="icon">
                  <Home/>
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="icon">
                  <LayoutDashboard/>
                </Button>
              </Link>
              <Link href="/upload">
                <Button variant="outline" size="icon">
                  <Upload/>
                </Button>
              </Link>
              <ModeToggle/>
            </nav>
            <main className="w-full grow flex flex-col items-center justify-between pt-14">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
