"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Bell, Lock, Shield, Palette, 
  Globe, Mail, Save, Sparkles, ArrowLeft,
  Smartphone, Eye, Languages, Fingerprint
} from "lucide-react";

type SettingTab = "profile" | "notifications" | "security" | "appearance";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SettingTab>("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User, color: "text-indigo-600", bg: "bg-indigo-100/50", desc: "Personal information & public identity" },
    { id: "notifications", label: "Notifications", icon: Bell, color: "text-amber-600", bg: "bg-amber-100/50", desc: "Manage alerts & email preferences" },
    { id: "security", label: "Security", icon: Lock, color: "text-rose-600", bg: "bg-rose-100/50", desc: "Password, 2FA & session safety" },
    { id: "appearance", label: "Appearance", icon: Palette, color: "text-emerald-600", bg: "bg-emerald-100/50", desc: "Theme, colors & interface settings" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-12 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-7xl mx-auto"
      >
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => router.push("/workflow-builder")}
            className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-bold transition-all group"
          >
            <div className="p-3 rounded-2xl bg-white/60 border border-white shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft size={20} />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Exit Settings</span>
              <span className="text-sm">Back to Workflow</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white/40 border border-white/60 rounded-3xl backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">System Synchronized</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Sidebar Navigation */}
          <aside className="lg:col-span-4 space-y-6">
            <div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Settings</h1>
              <p className="text-slate-500 font-medium text-lg">Control your account environment.</p>
            </div>

            <nav className="space-y-3 mt-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingTab)}
                  className={`w-full flex items-start gap-4 p-5 rounded-[2rem] transition-all text-left relative overflow-hidden group ${
                    activeTab === tab.id 
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-300" 
                    : "bg-white/40 hover:bg-white/80 text-slate-600 border border-white/50"
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${activeTab === tab.id ? "bg-white/10 text-white" : `${tab.bg} ${tab.color}`}`}>
                    <tab.icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{tab.label}</span>
                    <span className={`text-xs font-medium ${activeTab === tab.id ? "text-slate-400" : "text-slate-500"}`}>
                      {tab.desc}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </aside>

          {/* RIGHT SIDE: Main Content Area */}
          <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="backdrop-blur-3xl bg-white/70 border border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] rounded-[3.5rem] p-8 md:p-12 min-h-[600px] flex flex-col"
              >
                {/* Profile Section */}
                {activeTab === "profile" && (
                  <section className="space-y-10 flex-1">
                    <div className="flex items-center gap-8 pb-10 border-b border-slate-200/50">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-600 p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-black text-indigo-600">A</div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-slate-900">User Profile</h2>
                        <p className="text-slate-500 font-medium">Update your photo and personal details.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputBlock label="Display Name" value="Admin User" icon={<User size={18}/>} />
                      <InputBlock label="Email Address" value="admin@workflow.ai" icon={<Mail size={18}/>} />
                      <InputBlock label="Professional Role" value="Lead Architect" />
                      <InputBlock label="Timezone" value="UTC -05:00 Eastern Time" icon={<Globe size={18}/>} />
                    </div>
                  </section>
                )}

                {/* Security Section (Example of variety) */}
                {activeTab === "security" && (
                  <section className="space-y-10 flex-1">
                    <div className="pb-10 border-b border-slate-200/50">
                      <h2 className="text-3xl font-black text-slate-900">Security & Privacy</h2>
                      <p className="text-slate-500 font-medium">Manage your password and authentication.</p>
                    </div>

                    <div className="space-y-4">
                      <ToggleOption title="Two-Factor Authentication" desc="Add an extra layer of security to your account." icon={<Fingerprint size={20} />} active />
                      <ToggleOption title="Session Timeout" desc="Automatically log out after 30 minutes of inactivity." icon={<Shield size={20} />} active={false} />
                    </div>
                  </section>
                )}

                {/* Footer Buttons */}
                <div className="mt-12 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Last changes saved 2m ago</p>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all">Discard</button>
                    <button className="flex-1 md:flex-none px-12 py-4 rounded-2xl font-black bg-slate-900 text-white hover:bg-indigo-600 shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <Save size={18} />
                      Save Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </motion.div>
    </div>
  );
}

/* UI Helper Components */
function InputBlock({ label, value, icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">{icon}</div>}
        <input 
          defaultValue={value}
          className={`w-full ${icon ? 'pl-12' : 'px-5'} py-4 bg-slate-50/50 border border-slate-200 rounded-2xl font-semibold text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all`} 
        />
      </div>
    </div>
  );
}

function ToggleOption({ title, desc, icon, active }: { title: string; desc: string; icon: any, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all group">
      <div className="flex gap-4 items-center">
        <div className="p-3 bg-white rounded-xl text-slate-400 group-hover:text-indigo-500 shadow-sm transition-colors">{icon}</div>
        <div>
          <h4 className="font-bold text-slate-900">{title}</h4>
          <p className="text-sm text-slate-500 font-medium">{desc}</p>
        </div>
      </div>
      <div className={`w-12 h-7 rounded-full transition-all relative ${active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}