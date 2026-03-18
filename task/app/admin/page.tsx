"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Users, ShieldCheck, Activity, Zap, 
  ArrowUpRight, Database, Globe, Settings, ArrowLeft 
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const stats = [
    { label: "Active Users", value: "1,284", icon: Users, color: "text-blue-600", bg: "bg-blue-100/50" },
    { label: "Security score", value: "98%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-100/50" },
    { label: "Server Load", value: "24%", icon: Zap, color: "text-amber-600", bg: "bg-amber-100/50" },
    { label: "Uptime", value: "99.99%", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-100/50" },
  ];

  return (
    <div className="min-h-screen p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => router.push("/workflow-builder")}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-6 transition-colors group"
        >
          <div className="p-2 rounded-xl bg-white/50 border border-slate-200 group-hover:border-indigo-200 group-hover:bg-indigo-50 shadow-sm transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm tracking-wide">Back to Workflow</span>
        </motion.button>

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Admin Console</h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">System-wide management and real-time oversight.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all text-slate-700">
            <Settings size={18} />
            System Config
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="backdrop-blur-xl bg-white/60 border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live</span>
              </div>
              <h3 className="text-slate-500 text-xs font-black uppercase tracking-wider">{stat.label}</h3>
              <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2 backdrop-blur-xl bg-white/70 border border-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50">
            <h3 className="text-xl font-black text-slate-900 mb-8">System Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Activity size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-bold text-sm">System Backup Completed</p>
                    <p className="text-slate-500 text-xs font-medium">Auto-archive stored in Primary AWS Bucket.</p>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-300 group-hover:text-indigo-400" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="backdrop-blur-xl bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-900/20">
            <h3 className="text-2xl font-black mb-6 text-indigo-400">Storage</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 text-xs font-black text-slate-400">
                  <span>Main Cluster</span>
                  <span>84%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "84%" }} transition={{ duration: 1 }} className="h-full bg-indigo-500" />
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 border border-white/5 rounded-2xl font-bold transition-all">Launch Diagnostics</button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}