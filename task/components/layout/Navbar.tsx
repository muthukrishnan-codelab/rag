"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Files, Settings, ShieldCheck, Share2 } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Workflow", path: "/workflow-builder", icon: Share2 }, 
    { name: "Documents", path: "/documents", icon: Files },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Admin", path: "/admin", icon: ShieldCheck },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-violet-500/50 shadow-[0_4px_20px_rgba(139,92,246,0.15)]">
      <div className="max-w-full mx-auto h-16 flex items-center justify-between px-6 lg:px-10">
        
        <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-violet-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)]">
             <span className="text-[10px] font-black text-white uppercase">RAG</span>
          </div>
          <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-400">
            RAG Workflow Builder
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`h-full flex items-center gap-2 px-4 text-sm font-semibold transition-all relative ${
                  isActive ? "text-violet-400" : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon size={16} />
                {item.name}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
                )}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden p-2 text-violet-400 hover:bg-violet-500/10 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black border-t border-violet-500/30 px-4 py-6 space-y-2 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 p-4 rounded-xl text-base font-bold transition-all ${
                  isActive 
                  ? "bg-violet-600 text-white shadow-lg" 
                  : "text-gray-400 hover:bg-violet-500/5"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}