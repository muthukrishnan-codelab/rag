"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Trash2, FileText, ChevronLeft, 
  ChevronRight, MoreHorizontal, FileCode, 
  FileSpreadsheet, File
} from "lucide-react";

type DocumentStatus = "Processed" | "Processing" | "Failed" | "Pending";

interface DocumentItem {
  id: number;
  name: string;
  status: DocumentStatus;
  date: string;
  uploadedBy: string;
}

const allDocuments: DocumentItem[] = [
  { id: 1, name: "Product_Manual.pdf", status: "Processed", date: "Apr 22, 2025", uploadedBy: "Admin" },
  { id: 2, name: "FAQ_Documents.docx", status: "Processing", date: "Apr 23, 2025", uploadedBy: "John Doe" },
  { id: 3, name: "HR_Policies.pdf", status: "Processed", date: "Apr 21, 2025", uploadedBy: "Admin" },
  { id: 4, name: "Onboarding_Guide.txt", status: "Pending", date: "Apr 20, 2025", uploadedBy: "Sarah Lee" },
  { id: 5, name: "Tech_Specifications.pdf", status: "Failed", date: "Apr 19, 2025", uploadedBy: "Admin" },
  { id: 6, name: "Company_Handbook.pdf", status: "Processed", date: "Apr 18, 2025", uploadedBy: "Michael Brown" },
  { id: 7, name: "Marketing_Strategy.pptx", status: "Processed", date: "Apr 15, 2025", uploadedBy: "Emily White" },
  { id: 8, name: "Q1_Financials.xlsx", status: "Processing", date: "Apr 14, 2025", uploadedBy: "Finance Team" },
  { id: 9, name: "Security_Audit.pdf", status: "Failed", date: "Apr 12, 2025", uploadedBy: "System" },
  { id: 10, name: "Brand_Guidelines.pdf", status: "Processed", date: "Apr 10, 2025", uploadedBy: "Admin" },
  { id: 11, name: "Customer_Feedback.csv", status: "Pending", date: "Apr 08, 2025", uploadedBy: "Sarah Lee" },
  { id: 12, name: "Legal_Terms.docx", status: "Processed", date: "Apr 05, 2025", uploadedBy: "Legal Dept" },
];

const statusStyles: Record<DocumentStatus, { bg: string; dot: string }> = {
  Processed: { bg: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Processing: { bg: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500 animate-pulse" },
  Failed: { bg: "bg-rose-100 text-rose-700 border-rose-200", dot: "bg-rose-500" },
  Pending: { bg: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
};

export default function DocumentTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocs = allDocuments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allDocuments.length / itemsPerPage);

  // Helper to get specific icons/colors based on extension
  const getFileStyle = (name: string) => {
    if (name.endsWith('.pdf')) return { icon: FileText, color: "text-rose-500", bg: "bg-rose-50" };
    if (name.endsWith('.xlsx') || name.endsWith('.csv')) return { icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-50" };
    if (name.endsWith('.md') || name.endsWith('.txt')) return { icon: FileCode, color: "text-slate-500", bg: "bg-slate-100" };
    return { icon: File, color: "text-indigo-500", bg: "bg-indigo-50" };
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Document Name</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Upload Date</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Owner</th>
            <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          <AnimatePresence mode="wait">
            {currentDocs.map((doc, i) => {
              const fileStyle = getFileStyle(doc.name);
              return (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.04 }}
                  className="group hover:bg-indigo-50/40 transition-all cursor-default"
                >
                  {/* Name Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 ${fileStyle.bg} rounded-xl group-hover:scale-110 transition-transform`}>
                        <fileStyle.icon size={20} className={fileStyle.color} />
                      </div>
                      <span className="font-bold text-slate-800 tracking-tight">{doc.name}</span>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-tight ${statusStyles[doc.status].bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[doc.status].dot}`} />
                      {doc.status}
                    </span>
                  </td>

                  {/* Date Column */}
                  <td className="px-6 py-4 text-slate-500 font-bold text-xs">{doc.date}</td>

                  {/* Owner Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-white shadow-md flex items-center justify-center text-[10px] font-black text-white">
                        {doc.uploadedBy.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-slate-700">{doc.uploadedBy}</span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <motion.button whileHover={{ y: -2 }} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all">
                        <Download size={16} />
                      </motion.button>
                      <motion.button whileHover={{ y: -2 }} className="p-2 bg-white border border-slate-200 rounded-xl text-rose-400 hover:bg-rose-50 hover:border-rose-200 hover:shadow-lg transition-all">
                        <Trash2 size={16} />
                      </motion.button>
                      <button className="p-1 text-slate-300 hover:text-slate-900 transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/20">
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
            Page <span className="text-slate-900">{currentPage}</span> of {totalPages}
          </span>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center px-2 gap-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`text-xs font-black transition-all ${
                    currentPage === index + 1 ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-500"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl disabled:opacity-20 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
      </div>
    </div>
  );
}