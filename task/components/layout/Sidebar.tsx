"use client";

import { useState } from "react";
import {
Search,
Code,
Brain,
Settings,
Menu,
X,
ChevronLeft,
ChevronRight,
LucideIcon,
} from "lucide-react";

type ItemProps = {
icon: LucideIcon;
label: string;
type: string;
collapsed: boolean;
};

export default function Sidebar() {
const [open, setOpen] = useState(false);
const [collapsed, setCollapsed] = useState(false);

const Item = ({ icon: Icon, label, type, collapsed }: ItemProps) => (
  <div
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData("nodeType", type);
    }}
    className={`flex items-center ${
      collapsed ? "justify-center" : "gap-3"
    } bg-zinc-900 p-3 rounded-lg hover:bg-purple-700/20 cursor-grab transition`}
  >
    <Icon size={18} className="text-purple-400" />

    {!collapsed && (
      <span className="text-sm whitespace-nowrap">{label}</span>
    )}
  </div>
);

return (
<>
{/* MOBILE HEADER */} <div className="lg:hidden flex items-center justify-between p-4 bg-zinc-950 border-b border-zinc-800 text-white"> <h2 className="font-semibold">Components</h2>
<button onClick={() => setOpen(true)}> <Menu /> </button> </div>


  {open && (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/40 z-40 lg:hidden"
    />
  )}

  <aside
    className={`fixed lg:static top-0 left-0 z-50 h-full
    ${collapsed ? "w-20" : "w-64"}
    bg-zinc-950 border-r border-zinc-800 text-white
    transform transition-all duration-300
    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    flex flex-col`}
  >
    <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
      {!collapsed && (
        <h2 className="text-lg font-semibold text-purple-400">
          Components
        </h2>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block text-gray-400 hover:text-purple-400"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>

        <button onClick={() => setOpen(false)} className="lg:hidden">
          <X />
        </button>
      </div>
    </div>

    <div className="p-3 space-y-2 overflow-y-auto flex-1">

      <Item
        icon={Search}
        label="Retriever Node"
        type="Retriever Node"
        collapsed={collapsed}
      />

      <Item
        icon={Code}
        label="Prompt Node"
        type="Prompt Node"
        collapsed={collapsed}
      />

      <Item
        icon={Brain}
        label="LLM Generation"
        type="LLM Generation"
        collapsed={collapsed}
      />

      <Item
        icon={Settings}
        label="Post Processor"
        type="Post Processor"
        collapsed={collapsed}
      />

    </div>
  </aside>
</>

);
}
