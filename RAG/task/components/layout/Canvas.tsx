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
    <div className="flex-1 bg-gray-100 relative flex flex-col h-full">

      {role === "user" && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2">
          View-only mode: Editing disabled for your role.
        </div>
      )}

      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white p-2 rounded shadow">
        <button onClick={zoomOut}>
          <ZoomOut size={16} />
        </button>

        <button onClick={zoomIn}>
          <ZoomIn size={16} />
        </button>

        <button onClick={resetZoom}>
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 relative bg-gray-100 h-full">

        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="relative w-[3500px] h-[2200px] bg-white border border-gray-300 rounded-2xl shadow"
        >

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg,#e5e7eb 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {nodes.map((node) => (
            <div
              key={node.id}
              style={{ top: node.y, left: node.x }}
              onMouseDown={(e) => handleMouseDown(e, node)}
              className="absolute bg-white border rounded-lg shadow w-56 cursor-move"
            >
              <div className="bg-purple-600 text-white px-4 py-2 rounded-t-lg flex justify-between items-center">

                {editingNode === node.id ? (
                  <input
                    className="bg-transparent text-white outline-none w-full"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => saveEdit(node.id)}
                    autoFocus
                  />
                ) : (
                  <span>{node.type}</span>
                )}

                <button onClick={() => setMenuOpen(node.id)}>
                  <MoreVertical size={16} />
                </button>
              </div>

              <div className="p-3 text-sm text-gray-600">
                <div>Model: LLaMA 2</div>
                <div>Max Tokens: 500</div>
              </div>

              {menuOpen === node.id && (
                <div className="absolute right-2 top-10 bg-white border shadow rounded text-sm">

                  {role === "admin" && (
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setEditingNode(node.id);
                        setEditValue(node.type);
                        setMenuOpen(null);
                      }}
                    >
                      Edit
                    </div>
                  )}

                  {(role === "admin" || role === "vendor") && (
                    <div
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => duplicateNode(node)}
                    >
                      Duplicate
                    </div>
                  )}

                  {role === "admin" && (
                    <div
                      className="px-3 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                      onClick={() => deleteNode(node.id)}
                    >
                      Delete
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}