"use client";

import { Search, Code, Brain, Settings, Database, Wand2 } from "lucide-react";

type Props = {
  switchToCanvas: () => void;
};

const components = [
  {
    title: "Retriever Node",
    description:
      "Fetches and retrieves relevant context from the knowledge base.",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
    type: "retriever",
  },
  {
    title: "Prompt Node",
    description: "Manages the prompt template used for generating prompts.",
    icon: Code,
    color: "from-purple-500 to-indigo-500",
    type: "prompt",
  },
  {
    title: "LLM Node",
    description:
      "Uses an LLM for generating responses with retrieved context.",
    icon: Brain,
    color: "from-indigo-500 to-blue-500",
    type: "llm",
  },
  {
    title: "Post-Processor Node",
    description:
      "Formats and processes the output of the LLM generation step.",
    icon: Settings,
    color: "from-orange-400 to-yellow-500",
    type: "post",
  },
  {
    title: "Vector Database",
    description:
      "Stores embeddings and enables semantic search across documents.",
    icon: Database,
    color: "from-teal-500 to-cyan-500",
    type: "vector",
  },
  {
    title: "Agent Node",
    description:
      "Controls reasoning flow and manages tool interactions.",
    icon: Wand2,
    color: "from-pink-500 to-purple-500",
    type: "agent",
  },
];

export default function WorkflowComponents({ switchToCanvas }: Props) {
  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-xl font-semibold mb-6 text-gray-800">
        Components
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {components.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex gap-4 items-start hover:shadow-md transition"
            >
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-lg text-white bg-gradient-to-r ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <div className="flex-1">
                <h2 className="font-semibold text-gray-800 text-lg">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>

                <button
                  onClick={() => {
                    const existing = JSON.parse(
                      localStorage.getItem("canvasNodes") || "[]"
                    );

                    const newNode = {
                      id: crypto.randomUUID(),
                      type: item.type,
                      x: 200 + existing.length * 40,
                      y: 150 + existing.length * 40,
                    };

                    existing.push(newNode);

                    localStorage.setItem(
                      "canvasNodes",
                      JSON.stringify(existing)
                    );

                    // switch tab without reloading
                    switchToCanvas();
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform text-white text-sm px-4 py-2 rounded-md shadow"
                >
                  Drag to Canvas
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}