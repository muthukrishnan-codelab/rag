"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Activity, 
  BarChart3, 
  Clock, 
  Database, 
  Layers, 
  LayoutDashboard, 
  Zap, 
  ArrowLeft,
  Search,
  ChevronRight,
  Target
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 p-6 md:p-10 font-sans selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="max-w-[1600px] mx-auto relative z-10"
      >
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => router.push("/workflow-builder")}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-400"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <LayoutDashboard size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">System Intelligence</span>
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter">Performance Overview</h1>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search metrics or test runs..." 
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          <motion.div variants={itemVars} className="lg:col-span-4 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Test Run Properties</h3>
            <div className="space-y-5">
              <PropRow label="Test Run ID" value="clymyh8ag0059oipabgdf35nu" isCopyable />
              <PropRow label="Dataset" value="QA Dataset" badge="indigo" />
              <PropRow label="Identifier" value="run:gpt-3.5" icon={<Zap size={12}/>} />
              <PropRow label="Executed At" value="May 29, 12:05 AM" />
              <PropRow label="Duration" value="48.8s" />
            </div>
          </motion.div>

          <motion.div variants={itemVars} className="lg:col-span-4 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md flex flex-col items-center justify-center relative overflow-hidden">
            <h3 className="absolute top-8 left-8 text-slate-400 text-xs font-black uppercase tracking-widest">Results Summary</h3>
            <div className="relative mt-4">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                <motion.circle 
                  cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
                  strokeDasharray="552.9"
                  initial={{ strokeDashoffset: 552.9 }}
                  animate={{ strokeDashoffset: 552.9 - (552.9 * 0.5) }} 
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-emerald-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">5/10</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Passing Cases</span>
              </div>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-400 italic">"Model performance is stable but requires tuning"</p>
          </motion.div>

          <motion.div variants={itemVars} className="lg:col-span-4 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Hyperparameters</h3>
              <div className="flex gap-1">
                <div className="p-1 rounded-md bg-white/5 text-slate-500 cursor-pointer"><ChevronRight className="rotate-180" size={14}/></div>
                <div className="p-1 rounded-md bg-white/10 text-white cursor-pointer"><ChevronRight size={14}/></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Prompt Template</span>
                <span className="text-white font-bold">My Messages Prompt</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Top-K</span>
                <span className="text-white font-bold font-mono">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Embedding Model</span>
                <span className="text-indigo-400 font-bold">text-embedding-3-small</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Model</span>
                <span className="text-white font-bold">gpt-3.5-turbo</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div variants={itemVars} className="lg:col-span-5 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md overflow-hidden relative">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-10">Metric Scores Overview</h3>
            <div className="flex items-center justify-center h-64 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500/20">
                <circle cx="50" cy="50" r="10" stroke="currentColor" fill="none" />
                <circle cx="50" cy="50" r="25" stroke="currentColor" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" />
                <motion.polygon 
                  points="50,20 80,50 50,80 20,50" 
                  fill="rgba(99, 102, 241, 0.4)" 
                  stroke="#6366f1" 
                  strokeWidth="1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                />
              </svg>
              <div className="absolute top-0 text-[10px] font-black text-slate-500">CORRECTNESS</div>
              <div className="absolute bottom-0 text-[10px] font-black text-slate-500">RELEVANCY</div>
            </div>
          </motion.div>

          <motion.div variants={itemVars} className="lg:col-span-7 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Metrics Analysis</h3>
              <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
                {['Histogram', 'Average', 'Median'].map((t, i) => (
                  <button key={t} className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-500 hover:text-slate-300'}`}>
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-60 flex items-end justify-between gap-2 px-4">
              {[40, 70, 45, 90, 65, 30, 85, 20, 55, 95].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1 + (i * 0.05), duration: 0.8 }}
                  className="flex-1 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-t-lg relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Score: {h}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex justify-between px-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <span>Low Accuracy</span>
              <span>Perfect Score</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}


function PropRow({ label, value, isCopyable, badge, icon }: any) {
  return (
    <div className="flex items-center justify-between group">
      <span className="text-slate-500 text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {icon && <span className="text-indigo-400">{icon}</span>}
        <span className={`text-sm font-bold font-mono transition-colors ${isCopyable ? 'text-indigo-300 hover:text-indigo-100 cursor-pointer' : 'text-white'}`}>
          {value}
        </span>
        {badge && (
          <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter bg-indigo-500/20 text-indigo-400 border border-indigo-500/30`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}