"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Trash2, FileText, ChevronLeft, 
  ChevronRight, MoreHorizontal, FileCode, 
  FileSpreadsheet, File, Loader2, FolderOpen,
  AlertCircle, CheckCircle2, Info
} from "lucide-react";

type DocumentStatus = "Processed" | "Processing" | "Failed" | "Pending";

interface DocumentItem {
  id: number;
  name: string;
  status: DocumentStatus;
  date: string;
  uploadedBy: string;
}

const statusStyles: Record<DocumentStatus, { bg: string; dot: string }> = {
  Processed: { bg: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Processing: { bg: "bg-blue-100 text-blue-700 border-blue-200", dot: "bg-blue-500 animate-pulse" },
  Failed: { bg: "bg-rose-100 text-rose-700 border-rose-200", dot: "bg-rose-500" },
  Pending: { bg: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
};

export default function DocumentTable() {
  const [masterList, setMasterList] = useState<DocumentItem[]>(INITIAL_DATA);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [deleteTarget, setDeleteTarget] = useState<DocumentItem | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      const startIndex = (currentPage - 1) * itemsPerPage;
      setDocuments(masterList.slice(startIndex, startIndex + itemsPerPage));
      setLoading(false);
    };
    fetchDocuments();
  }, [currentPage, masterList]);

  const totalPages = Math.ceil(masterList.length / itemsPerPage);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setMasterList(prev => prev.filter(doc => doc.id !== deleteTarget.id));
    setDeleteTarget(null);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const getFileStyle = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith('.pdf')) return { icon: FileText, color: "text-rose-500", bg: "bg-rose-50" };
    if (lower.endsWith('.xlsx') || lower.endsWith('.csv')) return { icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-50" };
    if (lower.endsWith('.md') || lower.endsWith('.txt')) return { icon: FileCode, color: "text-slate-500", bg: "bg-slate-100" };
    return { icon: File, color: "text-indigo-500", bg: "bg-indigo-50" };
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[600px] relative">
      <div className="flex-grow overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-[30%]">Document Name</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-[15%]">Status</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-[15%]">Upload Date</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 w-[20%]">Owner</th>
              <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 relative">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.tr key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <td colSpan={5} className="h-96 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Loading Records...</p>
                    </div>
                  </td>
                </motion.tr>
              ) : documents.length === 0 ? (
                <motion.tr key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan={5} className="h-96 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                       <FolderOpen size={40} className="text-slate-200" />
                       <h3 className="text-xl font-black text-slate-900">No documents found</h3>
                    </div>
                  </td>
                </motion.tr>
              ) : (
                documents.map((doc, i) => {
                  const fileStyle = getFileStyle(doc.name);
                  return (
                    <motion.tr 
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: i * 0.04 }}
                      className="group hover:bg-slate-50/50 transition-all"
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 ${fileStyle.bg} rounded-xl shadow-sm`}>
                            <fileStyle.icon size={20} className={fileStyle.color} />
                          </div>
                          <span className="font-bold text-slate-800 tracking-tight text-sm">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-tight ${statusStyles[doc.status].bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[doc.status].dot}`} />
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-bold text-xs">{doc.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white uppercase overflow-hidden border-2 border-white shadow-sm">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${doc.uploadedBy}&background=random&color=fff`} 
                                alt="avatar" 
                                className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs font-black text-slate-700">{doc.uploadedBy}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex justify-center items-center gap-3">
                          <motion.button whileHover={{ y: -2 }} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm transition-colors">
                            <Download size={16} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ y: -2 }} 
                            onClick={() => setDeleteTarget(doc)}
                            className="p-2 bg-white border border-slate-200 rounded-xl text-rose-400 hover:bg-rose-50 shadow-sm transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                          <button className="p-1 text-slate-300 hover:text-slate-900 transition-colors">
                            <MoreHorizontal size={20} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination & Modals remain same as updated in previous step */}
      <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/20 mt-auto">
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          Page <span className="text-slate-900">{currentPage}</span> of {totalPages}
        </span>
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || loading}
            className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center px-2 gap-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`text-xs font-black transition-all ${currentPage === index + 1 ? "text-indigo-600 scale-125" : "text-slate-300 hover:text-slate-500"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || loading}
            className="p-2 text-slate-400 hover:text-indigo-600 disabled:opacity-20 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center border border-slate-100">
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4"><AlertCircle size={28} /></div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Confirm Deletion</h3>
              <p className="text-slate-500 text-sm mt-2 mb-8">Delete <span className="font-bold text-slate-800">"{deleteTarget.name}"</span>?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-50">Cancel</button>
                <button onClick={handleConfirmDelete} className="flex-1 py-3 rounded-xl font-bold bg-rose-500 text-white hover:bg-rose-600">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessToast && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-10 right-10 z-[10000] bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="text-emerald-400" size={18} />
            <span className="text-sm font-bold">Deleted successfully</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const INITIAL_DATA: DocumentItem[] = [
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
  { id: 13, name: "Project_Timeline.md", status: "Processed", date: "Apr 04, 2025", uploadedBy: "Admin" },
  { id: 14, name: "User_Research.pdf", status: "Processing", date: "Apr 03, 2025", uploadedBy: "Design Lab" },
  { id: 15, name: "Budget_Review.xlsx", status: "Processed", date: "Apr 02, 2025", uploadedBy: "Finance Team" },
  { id: 16, name: "API_Documentation.md", status: "Failed", date: "Apr 01, 2025", uploadedBy: "Dev Lead" },
  { id: 17, name: "Meeting_Notes.txt", status: "Processed", date: "Mar 30, 2025", uploadedBy: "Sarah Lee" },
  { id: 18, name: "Inventory_List.csv", status: "Pending", date: "Mar 28, 2025", uploadedBy: "Warehouse" },
  { id: 19, name: "Architecture_Draft.pdf", status: "Processed", date: "Mar 25, 2025", uploadedBy: "System" },
  { id: 20, name: "Client_Contract.docx", status: "Processing", date: "Mar 22, 2025", uploadedBy: "Legal Dept" },
];