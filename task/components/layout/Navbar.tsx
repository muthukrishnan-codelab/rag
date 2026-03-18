"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Documents", path: "/documents" },
    { name: "Settings", path: "/settings" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">

      <div className="h-16 flex items-center justify-between px-4 sm:px-8">
        <h1 className="text-lg sm:text-xl font-semibold text-purple-400 whitespace-nowrap">
          RAG Workflow Builder
        </h1>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="cursor-pointer text-gray-300 hover:text-purple-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-zinc-900 border-t border-gray-800 px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="block text-gray-300 hover:text-purple-400 cursor-pointer transition"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}