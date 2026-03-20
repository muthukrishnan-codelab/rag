"use client";

import { Search, Code, Brain, Settings, Database, Wand2, Plus } from "lucide-react";

type Props = {
  switchToCanvas: () => void;
};

const components = [
  {
    title: "Retriever Node",
    description: "Fetches relevant context from your knowledge base.",
    icon: Search,
    color: "bg-blue-50 text-blue-600",
    type: "retriever",
  },
  {
    title: "Prompt Node",
    description: "Manages templates used for structured generations.",
    icon: Code,
    color: "bg-purple-50 text-purple-600",
    type: "prompt",
  },
  {
    title: "LLM Node",
    description: "Generates AI responses using retrieved context.",
    icon: Brain,
    color: "bg-indigo-50 text-indigo-600",
    type: "llm",
  },
  {
    title: "Post-Processor",
    description: "Formats and cleans the final output logic.",
    icon: Settings,
    color: "bg-orange-50 text-orange-600",
    type: "post",
  },
  {
    title: "Vector Database",
    description: "Stores embeddings for semantic search flows.",
    icon: Database,
    color: "bg-teal-50 text-teal-600",
    type: "vector",
  },
  {
    title: "Agent Node",
    description: "Controls reasoning and tool interaction logic.",
    icon: Wand2,
    color: "bg-pink-50 text-pink-600",
    type: "agent",
  },
];

export default function WorkflowComponents({ switchToCanvas }: Props) {
  const handleAddComponent = (item: typeof components[0]) => {
    const existing = JSON.parse(localStorage.getItem("canvasNodes") || "[]");

    const newNode = {
      id: crypto.randomUUID(),
      type: item.type,
      x: 100 + existing.length * 30,
      y: 100 + existing.length * 30,
    };

    existing.push(newNode);
    localStorage.setItem("canvasNodes", JSON.stringify(existing));
    
    switchToCanvas();
  };

  return (
    <div className="flex-1 p-10 bg-[#F8FAFC] min-h-full">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Workflow Components
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Select a node type to add it to your current project canvas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-400 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 transition-transform group-hover:scale-110 ${item.color}`}>
                    <Icon size={24} strokeWidth={2.5} />
                  </div>

                  <h2 className="font-bold text-slate-800 text-lg mb-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <button
                  onClick={() => handleAddComponent(item)}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-50 hover:bg-indigo-600 text-slate-600 hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95"
                >
                  <Plus size={16} />
                  Add to Canvas
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}