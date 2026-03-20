"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion"; 
import { Plus, Files } from "lucide-react";
import DocumentTable from "@/components/DocumentTable";
import UploadModal from "@/components/UploadModel";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 300, 
      damping: 24 
    } 
  },
};

export default function DocumentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-black relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.header 
          variants={itemVariants}
          className="bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 mb-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Files size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Knowledge Base</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                Document Management
              </h1>
              <p className="text-slate-400 mt-3 font-medium text-lg max-w-xl">
                Upload and manage the datasets powering your RAG workflows.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="w-full lg:w-auto">
              <motion.button 
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-500 text-white w-full sm:w-auto px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_10px_40px_rgba(139,92,246,0.3)] whitespace-nowrap"
              >
                <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                Upload Document
              </motion.button>
            </motion.div>
          </div>
        </motion.header>

        <motion.main 
          variants={itemVariants}
          className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-violet-500/20"
        >
          <div className="p-1"> 
            <DocumentTable />
          </div>
        </motion.main>
      </motion.div>

      <AnimatePresence mode="wait">
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