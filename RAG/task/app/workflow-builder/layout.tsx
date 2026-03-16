"use client";

import { useState } from "react";
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
      <div className="h-screen flex flex-col overflow-hidden">

        <Navbar />

        <div className="bg-gray-100 px-4 sm:px-8 pt-4 sm:pt-6 border-b">
          <div className="flex gap-3">

            <button
              onClick={() => setTab("canvas")}
              className={`px-6 py-2 rounded-t-lg text-sm font-medium transition ${
                tab === "canvas"
                  ? "bg-white border border-b-0 border-gray-300 text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Canvas
            </button>

            <button
              onClick={() => setTab("components")}
              className={`px-6 py-2 rounded-t-lg text-sm font-medium transition ${
                tab === "components"
                  ? "bg-white border border-b-0 border-gray-300 text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Components
            </button>

          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">

          <Sidebar />

          <main className="flex-1 overflow-auto bg-gray-50">
            {tab === "canvas" && <Canvas />}
            {tab === "components" && (
              <WorkflowComponents switchToCanvas={() => setTab("canvas")} />
            )}
          </main>

          <NodeSettings />

        </div>

        <div className="px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row gap-3 sm:justify-between bg-white border-t">
          <button className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition w-full sm:w-auto">
            Execute Workflow
          </button>

          <button className="bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-950 transition w-full sm:w-auto">
            Save Workflow
          </button>
        </div>

      </div>
    </AuthGuard>
  );
}