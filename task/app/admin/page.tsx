"use client";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Users, Zap, Globe, 
  Settings as SettingsIcon, ArrowLeft,
  Activity, ExternalLink
} from "lucide-react";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#121417] text-[#E2E8F0] p-8 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-10">
          <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-indigo-500/20">
              <ArrowLeft size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Workflow</span>
          </button>
        </div>

        <div className="relative mb-16 p-8 rounded-[2.5rem] bg-[#1A1D21] border border-white/10 shadow-2xl overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                Admin <span className="text-indigo-400">Console</span>
              </h1>
              <p className="text-slate-400 font-medium text-lg">
                System-wide management and real-time oversight.
              </p>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-[#E2E8F0] text-[#121417] rounded-2xl font-bold hover:bg-white transition-all shadow-lg active:scale-95">
              <SettingsIcon size={18} />
              System Config
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Active Users" value="1,284" icon={<Users size={20}/>} />
          <StatCard title="Security Score" value="98%" icon={<ShieldCheck size={20}/>} />
          <StatCard title="Server Load" value="24%" icon={<Zap size={20}/>} />
          <StatCard title="Uptime" value="99.99%" icon={<Globe size={20}/>} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#1A1D21] border border-white/5 rounded-[2.5rem] p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-8 text-white">System Activity</h3>
            <div className="space-y-4">
              <ActivityRow label="System Backup Completed" sub="Auto-archive stored in Primary AWS Bucket." />
              <ActivityRow label="Database Optimization" sub="Vector nodes indexed successfully." />
              <ActivityRow label="Login Anomaly Detected" sub="Filtered 42 suspicious attempts from IP: 192.x.x" />
            </div>
          </div>

          <div className="bg-[#1E2227] border border-indigo-500/20 rounded-[3rem] p-8 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
            <h3 className="text-2xl font-black text-indigo-400 mb-8">Storage</h3>
            <div className="space-y-3 mb-8 relative z-10">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Main Cluster</span>
                <span className="text-white">84%</span>
              </div>
              <div className="h-3 w-full bg-black/40 rounded-full p-1 border border-white/5">
                <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 w-[84%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.4)]" />
              </div>
            </div>
            <button className="mt-auto w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all text-slate-300">
              Launch Diagnostics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: any }) {
  return (
    <div className="p-8 bg-[#1A1D21] border border-white/10 rounded-[2.5rem] relative group hover:border-indigo-500/30 transition-all shadow-lg">
      <div className="absolute top-4 right-6 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] animate-pulse" />
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Live</span>
      </div>
      <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit mb-6">
        {icon}
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <h4 className="text-4xl font-black text-white">{value}</h4>
    </div>
  );
}

function ActivityRow({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex items-center justify-between p-5 rounded-3xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-black/20 rounded-2xl text-slate-500 group-hover:text-indigo-400 transition-colors">
          <Activity size={18} />
        </div>
        <div>
          <p className="font-bold text-[#E2E8F0] text-sm">{label}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{sub}</p>
        </div>
      </div>
      <ExternalLink size={14} className="text-slate-600 group-hover:text-white transition-all opacity-0 group-hover:opacity-100" />
    </div>
  );
}