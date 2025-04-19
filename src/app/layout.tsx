"use client";

import { Inter } from "next/font/google";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import { useState, useEffect } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll tespiti için etki
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <header className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-white'
      } border-b border-gray-200`}>
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <span className="sr-only">Menüyü aç</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="Logo" className="w-[52px] h-[52px]" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <aside className={`fixed top-0 left-0 z-40 h-screen pt-16 transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0 w-64 bg-white border-r border-gray-200`}>
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>
      
      <main className="flex-1 p-4 pt-20 sm:ml-64 transition-all duration-200">
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}


