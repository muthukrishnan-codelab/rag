"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import DocumentTable from "@/components/DocumentTable";
import UploadModal from "@/components/UploadModel";

export default function DocumentsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <header className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-2xl rounded-3xl p-8 mb-8">
          <button 
            onClick={() => router.push("/workflow-builder")}
            className="flex items-center gap-2 text-indigo-600 font-bold mb-6 hover:translate-x-[-4px] transition-transform group"
          >
            <ArrowLeft size={18} />
            <span className="text-xs uppercase tracking-widest">Return to Workflow</span>
          </button>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Document Management</h1>
              <p className="text-slate-500 mt-1 font-medium">Precision control over your knowledge base.</p>
            </div>

            <div className="flex gap-4 w-full md:w-auto items-center">
              <input
                type="text"
                placeholder="Search index..."
                className="w-full md:w-64 pl-5 pr-4 py-3 rounded-2xl bg-white/50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <UploadModal />
            </div>
          </div>
        </header>

        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/70 border border-white/80 shadow-2xl rounded-3xl overflow-hidden"
        >
          <DocumentTable />
        </motion.main>
      </motion.div>
    </div>
  );
}