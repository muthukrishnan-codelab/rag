"use client";

import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCcw, MoreVertical } from "lucide-react";

type NodeType = {
  id: string;
  type: string;
  x: number;
  y: number;
};

export default function Canvas() {
  const [zoom, setZoom] = useState<number>(1);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    const saved = localStorage.getItem("canvasNodes");
    if (!saved) return;
    try {
      const parsed: NodeType[] = JSON.parse(saved);
      const cleaned = parsed.map((node) => ({
        id: node.id || crypto.randomUUID(),
        type: node.type || "Node",
        x: node.x || 200,
        y: node.y || 150,
      }));
      setNodes(cleaned);
    } catch {
      console.error("Invalid canvasNodes data");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const saveNodes = (updated: NodeType[]) => {
    setNodes(updated);
    localStorage.setItem("canvasNodes", JSON.stringify(updated));
  };

  const saveEdit = (id: string) => {
    if (role !== "admin") return;
    const updated = nodes.map((node) => {
      if (node.id === id) {
        return { ...node, type: editValue };
      }
      return node;
    });
    saveNodes(updated);
    setEditingNode(null);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    node: NodeType
  ) => {
    if (role === "user") return;
    e.stopPropagation();
    setDraggingNode(node.id);
    setOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingNode) return;
    const updated = nodes.map((node) => {
      if (node.id === draggingNode) {
        return {
          ...node,
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        };
      }
      return node;
    });
    setNodes(updated);
  };

  const handleMouseUp = () => {
    if (!draggingNode) return;
    saveNodes(nodes);
    setDraggingNode(null);
  };

  const deleteNode = (id: string) => {
    if (role !== "admin") return;
    const updated = nodes.filter((n) => n.id !== id);
    saveNodes(updated);
    setMenuOpen(null);
  };

  const duplicateNode = (node: NodeType) => {
    if (role === "user") return;
    const newNode: NodeType = {
      id: crypto.randomUUID(),
      type: node.type,
      x: node.x + 40,
      y: node.y + 40,
    };
    const updated = [...nodes, newNode];
    saveNodes(updated);
    setMenuOpen(null);
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <div className="flex-1 bg-gray-100 relative flex flex-col h-full overflow-hidden">
      {role === "user" && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 z-50 border-b border-yellow-200">
          View-only mode: Editing disabled for your role.
        </div>
      )}

      <div className="absolute top-6 right-6 z-[999] flex flex-col gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200">
        <button 
          onClick={zoomIn} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
          title="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
        <button 
          onClick={zoomOut} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
          title="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <div className="h-px bg-gray-100 mx-1" />
        <button 
          onClick={resetZoom} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
          title="Reset Zoom"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-10 relative bg-gray-100 h-full">
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative w-[3500px] h-[2200px] bg-white border border-gray-300 rounded-3xl shadow-sm transition-transform duration-75 ease-out"
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              backgroundImage:
                "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg,#f0f0f0 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {nodes.map((node) => (
            <div
              key={node.id}
              style={{ 
                top: node.y, 
                left: node.x,
                zIndex: draggingNode === node.id || menuOpen === node.id ? 100 : 10 
              }}
              onMouseDown={(e) => handleMouseDown(e, node)}
              className="absolute bg-white border border-gray-200 rounded-xl shadow-md w-60 cursor-move overflow-visible transition-shadow hover:shadow-lg"
            >
              <div className="relative bg-purple-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
                {editingNode === node.id ? (
                  <input
                    className="bg-purple-700 text-white outline-none w-full px-2 py-0.5 rounded border border-purple-400"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(node.id)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(node.id)}
                    autoFocus
                  />
                ) : (
                  <span className="font-semibold truncate pr-2">{node.type}</span>
                )}

                <button 
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(node.id); }}
                  className="hover:bg-purple-500 p-1 rounded-md transition-colors"
                >
                  <MoreVertical size={18} />
                </button>
                
                {menuOpen === node.id && (
                  <div 
                    ref={menuRef}
                    className="absolute left-full top-0 ml-3 bg-white border border-gray-200 shadow-2xl rounded-lg text-sm w-40 z-[200] py-1.5 text-gray-700"
                  >
                    {role === "admin" && (
                      <div
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2"
                        onClick={() => {
                          setEditingNode(node.id);
                          setEditValue(node.type);
                          setMenuOpen(null);
                        }}
                      >
                        Edit Name
                      </div>
                    )}

                    {(role === "admin" || role === "vendor") && (
                      <div
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-2"
                        onClick={() => duplicateNode(node)}
                      >
                        Duplicate
                      </div>
                    )}

                    {role === "admin" && (
                      <div
                        className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer border-t border-gray-100 mt-1 pt-2 font-medium"
                        onClick={() => deleteNode(node.id)}
                      >
                        Delete Node
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 text-sm text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Model:</span>
                  <span className="text-gray-900 font-medium">LLaMA 2</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Tokens:</span>
                  <span className="text-gray-900 font-medium">500</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}