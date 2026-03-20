"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Settings2, Sparkles } from "lucide-react";

export default function NodeSettings() {
  const [open, setOpen] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div 
      className={`relative h-full bg-white border-l border-slate-200 transition-all duration-300 ease-in-out shadow-[[-4px_0_24px_rgba(0,0,0,0.02)]] z-20 flex flex-col ${
        open ? "w-80 lg:w-96" : "w-0"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`absolute top-1/2 -left-10 transform -translate-y-1/2 bg-white border border-slate-200 border-r-0 p-2 rounded-l-xl shadow-[-4px_0_10px_rgba(0,0,0,0.05)] text-slate-400 hover:text-indigo-600 transition-colors z-30 ${
          !open ? "flex" : "flex lg:hidden" // Show on desktop only when closed, or always on small screens
        }`}
      >
        {open ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
      </button>

      <div
        className={`px-6 py-5 flex justify-between items-center border-b border-slate-100 bg-slate-50/50 min-w-[320px] ${
          !open && "hidden"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Settings2 size={18} />
          </div>
          <h2 className="font-bold text-slate-800 tracking-tight">
            Node Settings
          </h2>
        </div>
        <button 
          onClick={() => setOpen(false)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        className={`flex-1 overflow-y-auto min-w-[320px] transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 border-b border-indigo-50 pb-3">
            <Sparkles size={12} />
            LLM Generation
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Model
            </label>
            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer">
              <option>LLaMA 3.1 (8B)</option>
              <option>GPT-4o mini</option>
              <option>Mistral Large</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Max Tokens
            </label>
            <input
              type="number"
              defaultValue={500}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Temperature
              </label>
              <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[11px] font-black">
                {temperature.toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50">
            <button
              onClick={handleSave}
              disabled={saved}
              className={`relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
                saved 
                ? "bg-emerald-500 text-white shadow-emerald-200" 
                : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200 active:scale-[0.98]"
              }`}
            >
              {saved ? (
                <>
                  <Check size={16} strokeWidth={3} />
                  Settings Saved
                </>
              ) : (
                "Save Node Settings"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}