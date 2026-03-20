"use client";

import { useState } from "react";
import { Play, Save, Layout, Grid2X2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import NodeSettings from "@/components/layout/NodeSettings";
import Canvas from "@/components/layout/Canvas";
import WorkflowComponents from "@/components/layout/workflowcomponents";
import AuthGuard from "@/components/AuthGuard";

export default function WorkflowBuilderLayout() {
  const [tab, setTab] = useState("canvas");

  return (
    <AuthGuard>
      <div className="h-screen flex flex-col overflow-hidden bg-[#F8FAFC]">
        <div className="bg-white border-b border-slate-200 z-30">
          <Navbar />
          
          <div className="px-6 flex justify-between items-center h-14">
            <div className="flex gap-8 h-full">
              <button
                onClick={() => setTab("canvas")}
                className={`flex items-center gap-2 text-sm font-bold tracking-wide transition-all relative h-full ${
                  tab === "canvas" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Layout size={18} />
                Canvas
                {tab === "canvas" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                )}
              </button>

              <button
                onClick={() => setTab("components")}
                className={`flex items-center gap-2 text-sm font-bold tracking-wide transition-all relative h-full ${
                  tab === "components" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Grid2X2 size={18} />
                Components
                {tab === "components" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                <Save size={14} strokeWidth={3} />
                Save
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200">
                <Play size={14} fill="currentColor" />
                Execute
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-hidden bg-slate-50 relative">
            <div className="h-full w-full">
              {tab === "canvas" ? (
                <Canvas />
              ) : (
                <div className="h-full overflow-y-auto">
                  <WorkflowComponents switchToCanvas={() => setTab("canvas")} />
                </div>
              )}
            </div>
          </main>

          <NodeSettings />
        </div>
      </div>
    </AuthGuard>
  );
}