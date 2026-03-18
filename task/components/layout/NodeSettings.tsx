"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

export default function NodeSettings() {
  const [open, setOpen] = useState(true);
  const [temperature, setTemperature] = useState(0.7);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="w-full sm:w-80 lg:w-96 bg-white border-l border-gray-200 h-full flex flex-col shadow-sm">

      <div
        onClick={() => setOpen(!open)}
        className="px-5 py-4 cursor-pointer flex justify-between items-center border-b bg-gray-50 hover:bg-gray-100 transition"
      >
        <h2 className="font-semibold text-gray-800">
          Node Settings
        </h2>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 space-y-6 overflow-y-auto">

          <div className="text-sm font-semibold text-blue-900 border-b pb-2">
            LLM Generation
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Model
            </label>
            <select className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition">
              <option>LLaMA 2</option>
              <option>GPT-4</option>
              <option>Mistral</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium">
              Max Tokens
            </label>
            <input
              type="number"
              defaultValue={500}
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-600 font-medium">
                Temperature
              </label>
              <span className="text-xs font-semibold text-blue-900">
                {temperature}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full mt-3 accent-blue-900"
            />
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="flex justify-center">
            <button
              onClick={handleSave}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-950 transition w-full sm:w-auto"
            >
              Save Node Settings
            </button>
          </div>

          {saved && (
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <Check size={16} />
                Settings saved successfully
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}