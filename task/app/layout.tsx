"use client";

import { Inter } from "next/font/google";
import "./global.css";
import Navbar from "../components/layout/Navbar"; 
import Providers from "../components/providers";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarPaths = ["/", "/login", "/signup"];
  const shouldHideNavbar = hideNavbarPaths.includes(pathname);

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Providers>
          
          {!shouldHideNavbar && <Navbar />}
          
          <main className={`
            ${!shouldHideNavbar ? "pt-20" : ""} 
            min-h-screen 
            bg-black 
            transition-colors duration-300
          `}>
            {children}
          </main>
          
        </Providers>
      </body>
    </html>
  );
}