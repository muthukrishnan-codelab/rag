"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, Trash2, FileText, ChevronLeft, 
  ChevronRight, FileCode, FileSpreadsheet, File, 
  Loader2, Search, Filter, RefreshCw, X
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
  Processed: { bg: "bg-emerald-50 text-emerald-700 border-emerald-100", dot: "bg-emerald-500" },
  Processing: { bg: "bg-blue-50 text-blue-700 border-blue-100", dot: "bg-blue-500 animate-pulse" },
  Failed: { bg: "bg-rose-50 text-rose-700 border-rose-100", dot: "bg-rose-500" },
  Pending: { bg: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500" },
};

export default function DocumentTable() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const [deleteTarget, setDeleteTarget] = useState<DocumentItem | null>(null);

  const { data: masterList = INITIAL_DATA, isLoading, isFetching } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return INITIAL_DATA; 
    },
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return id; 
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["documents"], (old: DocumentItem[] | undefined) => {
        return old ? old.filter((doc) => doc.id !== deletedId) : [];
      });
      setDeleteTarget(null);
    },
  });

  const filteredDocuments = useMemo(() => {
    return masterList.filter((doc) => {
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || doc.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [masterList, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const safePage = Math.max(1, Math.min(currentPage, totalPages || 1));
  const currentItems = useMemo(() => {
    return filteredDocuments.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);
  }, [filteredDocuments, safePage, itemsPerPage]);

  const getFileStyle = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith('.pdf')) return { icon: FileText, color: "text-rose-500", bg: "bg-rose-50" };
    if (lower.endsWith('.xlsx') || lower.endsWith('.csv')) return { icon: FileSpreadsheet, color: "text-emerald-500", bg: "bg-emerald-50" };
    if (lower.endsWith('.md') || lower.endsWith('.txt')) return { icon: FileCode, color: "text-slate-500", bg: "bg-slate-100" };
    return { icon: File, color: "text-indigo-500", bg: "bg-indigo-50" };
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-[1.5rem] border border-white shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            className="w-full pl-12 pr-10 py-3 bg-slate-100/50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-3">
          {isFetching && !isLoading && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-full border border-indigo-100">
              <RefreshCw size={12} className="text-indigo-500 animate-spin" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter">Syncing Data</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-slate-100/50 px-4 py-1.5 rounded-2xl border border-transparent focus-within:border-indigo-200 focus-within:bg-white transition-all">
            <Filter size={16} className="text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="bg-transparent border-none py-2 text-sm font-black text-slate-700 outline-none cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Processed">Processed</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden flex flex-col min-h-[520px]">
        <div className="flex-grow overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/30">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Document Name</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Upload Date</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Owner</th>
                <th className="px-8 py-5 text-center text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout" initial={false}>
                {isLoading ? (
                  <motion.tr key="loading" className="h-80"><td colSpan={5} className="text-center"><Loader2 className="mx-auto animate-spin text-indigo-500" /></td></motion.tr>
                ) : currentItems.length === 0 ? (
                  <motion.tr key="empty" className="h-80"><td colSpan={5} className="text-center text-slate-400 font-bold">No documents found</td></motion.tr>
                ) : (
                  currentItems.map((doc) => {
                    const fileStyle = getFileStyle(doc.name);
                    return (
                      <motion.tr 
                        key={doc.id} 
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group hover:bg-white/80 transition-all duration-300"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 ${fileStyle.bg} rounded-xl shadow-sm`}><fileStyle.icon size={20} className={fileStyle.color} /></div>
                            <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 border rounded-full text-[10px] font-black uppercase tracking-tighter ${statusStyles[doc.status].bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusStyles[doc.status].dot}`} />
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-slate-500 font-bold text-xs">{doc.date}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                              {doc.uploadedBy.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-xs font-black text-slate-700">{doc.uploadedBy}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 transition-all hover:shadow-md"><Download size={16} /></button>
                            <button 
                              onClick={() => setDeleteTarget(doc)} 
                              className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 transition-all hover:shadow-md"
                            >
                              <Trash2 size={16} />
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

        <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-slate-400">
            Showing <span className="text-slate-900">{(safePage - 1) * itemsPerPage + 1}—{Math.min(safePage * itemsPerPage, filteredDocuments.length)}</span> of {filteredDocuments.length}
          </span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all hover:bg-white rounded-xl border border-transparent hover:border-slate-100"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages || totalPages === 0}
              className="flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 disabled:opacity-30 transition-all hover:bg-white rounded-xl border border-transparent hover:border-slate-100"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100"
            >
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">Delete file?</h3>
              <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                Removing <span className="text-slate-900 font-bold">"{deleteTarget.name}"</span> cannot be undone. It will be purged from the RAG index.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => deleteMutation.mutate(deleteTarget.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-rose-600 text-white shadow-lg shadow-rose-200 hover:bg-rose-500 transition-all disabled:opacity-50"
                >
                  {deleteMutation.isPending ? "Purging..." : "Confirm"}
                </button>
              </div>
            </motion.div>
          </div>
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