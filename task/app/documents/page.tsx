"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Search } from "lucide-react";
import DocumentTable from "@/components/DocumentTable";
import UploadModal from "@/components/UploadModel";

export default function DocumentsPage() {
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-50/50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <header className="backdrop-blur-xl bg-white/70 border border-white shadow-xl rounded-[2.5rem] p-6 md:p-8 mb-8">
          <button 
            onClick={() => router.push("/workflow-builder")}
            className="flex items-center gap-2 text-indigo-600 font-bold mb-6 hover:translate-x-[-4px] transition-transform group"
          >
            <ArrowLeft size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em]">Return to Workflow</span>
          </button>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                Document Management
              </h1>
              <p className="text-slate-500 mt-1 font-medium">
                Centralized control for your knowledge base assets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search index..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm text-sm"
                />
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95 whitespace-nowrap"
              >
                <Plus size={20} />
                Upload Document
              </button>
            </div>
          </div>
        </header>

\        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/80 border border-white shadow-2xl rounded-[2.5rem] overflow-hidden"
        >
          <DocumentTable />
        </motion.main>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <UploadModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}