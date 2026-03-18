"use client";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, FileText, CheckCircle2 } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" 
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white w-full max-w-lg p-8 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] relative z-[10000] border border-slate-100"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8 text-center sm:text-left">
              <h2 className="text-2xl font-black text-slate-900 leading-tight">Upload Document</h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">Add a new file to your knowledge base.</p>
            </div>

            <div className="group relative border-2 border-dashed border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all rounded-[1.5rem] p-10 text-center cursor-pointer mb-8">
              <input type="file" className="hidden" id="file-input" />
              <label htmlFor="file-input" className="cursor-pointer">
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform"
                >
                  <UploadCloud className="text-white" size={28} />
                </motion.div>
                <p className="text-slate-800 font-bold text-lg leading-snug">Select a file or drag here</p>
                <p className="text-xs text-slate-400 mt-2">PDF, DOCX, TXT (Max. 20MB)</p>
              </label>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 block mb-2">Document Title</label>
                <input 
                  type="text"
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none font-medium text-slate-700" 
                  placeholder="e.g. Annual_Report_2026" 
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                 <button 
                  onClick={onClose}
                  className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all order-2 sm:order-1"
                 >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert("File Uploading...");
                    onClose();
                  }}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 order-1 sm:order-2"
                >
                  Confirm Upload
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}