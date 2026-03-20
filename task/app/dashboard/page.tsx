"use client";

import { motion } from "framer-motion";
import { 
  Database, 
  Cpu, 
  Zap, 
  Search,
  MessageSquare,
  ShieldCheck,
  FileText,
  BarChart3,
  Clock,
  ExternalLink
} from "lucide-react";

export default function RAGDashboard() {
  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] text-[#E2E8F0] p-6 md:p-10 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="max-w-[1600px] mx-auto relative z-10"
      >
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                <Database size={14} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">RAG Pipeline Analytics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Workflow <span className="text-blue-400">Intelligence</span></h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
              View Vector Store
            </button>
            <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all">
              Re-Index Documents
            </button>
          </div>
        </header>

        {/* Top Stats: The RAG Fundamentals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<FileText size={20}/>} label="Documents Indexed" value="1,248" sub="12 New Today" color="text-blue-400" />
          <StatCard icon={<Zap size={20}/>} label="Avg. Retrieval" value="142ms" sub="-12ms vs last week" color="text-amber-400" />
          <StatCard icon={<ShieldCheck size={20}/>} label="Faithfulness" value="98.2%" sub="Hallucination rate: 1.8%" color="text-emerald-400" />
          <StatCard icon={<MessageSquare size={20}/>} label="Total Queries" value="45.2k" sub="+8% from yesterday" color="text-indigo-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Retrieval Precision Radar-ish Chart */}
          <motion.div variants={itemVars} className="lg:col-span-4 bg-[#14171C] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-2">
              <Search size={14} className="text-blue-400" />
              Retrieval Quality
            </h3>
            <div className="space-y-6">
              <QualityMetric label="Hit Rate @ 3" value={88} color="bg-blue-500" />
              <QualityMetric label="MRR (Mean Reciprocal Rank)" value={72} color="bg-indigo-500" />
              <QualityMetric label="Context Precision" value={91} color="bg-emerald-500" />
              <QualityMetric label="Context Recall" value={65} color="bg-amber-500" />
            </div>
            <div className="mt-10 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
              <p className="text-[11px] text-blue-300 leading-relaxed">
                <span className="font-bold">Recommendation:</span> High Recall but low Precision suggests you may need to adjust your Chunk Size or Top-K settings.
              </p>
            </div>
          </motion.div>

          {/* Active Nodes / Workflow Visualizer Snapshot */}
          <motion.div variants={itemVars} className="lg:col-span-8 bg-[#14171C] border border-white/5 rounded-[2.5rem] p-8 shadow-xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Cpu size={14} className="text-purple-400" /> Pipeline Latency (ms)
              </h3>
              <select className="bg-black/20 border border-white/5 rounded-lg px-3 py-1 text-[10px] font-bold text-slate-400 outline-none">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>

            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[60, 45, 80, 55, 90, 100, 85, 70, 75, 95, 65, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-2 items-center group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + (i * 0.05) }}
                    className="w-full bg-gradient-to-t from-blue-600/40 to-indigo-400/80 rounded-t-lg relative group-hover:to-white transition-all cursor-pointer"
                  />
                  <span className="text-[8px] font-black text-slate-600">{i + 1}h</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Recent Documents & Active Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div variants={itemVars} className="lg:col-span-12 bg-[#14171C] border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-500 text-xs font-black uppercase tracking-widest">Recent Document Ingestion</h3>
              <button className="text-[10px] font-black text-blue-400 flex items-center gap-1 hover:underline">
                VIEW ALL <ExternalLink size={10} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4 px-2">Source Name</th>
                    <th className="pb-4 px-2">Status</th>
                    <th className="pb-4 px-2">Chunks</th>
                    <th className="pb-4 px-2">Tokens</th>
                    <th className="pb-4 px-2">Last Sync</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  <DocRow name="Company_Handbook.pdf" status="Indexed" chunks="142" tokens="45k" time="2m ago" />
                  <DocRow name="Product_Specs_V2.md" status="Processing" chunks="--" tokens="12k" time="Just now" isProcessing />
                  <DocRow name="Customer_Support_FAQ.csv" status="Indexed" chunks="890" tokens="120k" time="1h ago" />
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-[#14171C] border border-white/5 rounded-3xl p-6 shadow-lg transition-all">
      <div className={`mb-4 p-2 w-fit rounded-xl bg-white/5 ${color}`}>
        {icon}
      </div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-black text-white mb-1">{value}</h4>
      <p className="text-[10px] text-slate-500 font-bold">{sub}</p>
    </motion.div>
  );
}

function QualityMetric({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold text-slate-400">{label}</span>
        <span className="text-xs font-black text-white">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
    </div>
  );
}

function DocRow({ name, status, chunks, tokens, time, isProcessing }: any) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
      <td className="py-4 px-2 text-white flex items-center gap-3">
        <FileText size={16} className="text-slate-500" />
        {name}
      </td>
      <td className="py-4 px-2">
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${isProcessing ? 'bg-amber-500/10 text-amber-500 animate-pulse' : 'bg-emerald-500/10 text-emerald-500'}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-2 text-slate-400 font-mono text-xs">{chunks}</td>
      <td className="py-4 px-2 text-slate-400 font-mono text-xs">{tokens}</td>
      <td className="py-4 px-2 text-slate-500 text-xs">{time}</td>
    </tr>
  );
}