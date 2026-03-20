"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Bell, Lock, Shield, Palette, 
  Globe, Mail, Save, Fingerprint, Settings as SettingsIcon
} from "lucide-react";

type SettingTab = "profile" | "notifications" | "security" | "appearance";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingTab>("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User, color: "text-violet-400", bg: "bg-violet-500/10", desc: "Personal info & public identity" },
    { id: "notifications", label: "Notifications", icon: Bell, color: "text-amber-400", bg: "bg-amber-500/10", desc: "Manage alerts & email" },
    { id: "security", label: "Security", icon: Lock, color: "text-rose-400", bg: "bg-rose-500/10", desc: "Password & session safety" },
    { id: "appearance", label: "Appearance", icon: Palette, color: "text-emerald-400", bg: "bg-emerald-500/10", desc: "Theme & interface settings" },
  ];

  return (
    <div className="min-h-screen p-6 md:p-12 bg-black text-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-violet-600/20 border border-violet-500/20 text-violet-400">
              <SettingsIcon size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Settings</h1>
              <p className="text-slate-500 font-medium">Control your account environment.</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Synchronized</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <aside className="lg:col-span-4 space-y-3">
            <nav className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingTab)}
                  className={`w-full flex items-start gap-4 p-5 rounded-[2rem] transition-all text-left relative overflow-hidden group border ${
                    activeTab === tab.id 
                    ? "bg-violet-600 border-violet-500 text-white shadow-[0_20px_40px_rgba(139,92,246,0.2)]" 
                    : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 border-white/5"
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${activeTab === tab.id ? "bg-white/20 text-white" : `${tab.bg} ${tab.color}`}`}>
                    <tab.icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{tab.label}</span>
                    <span className={`text-xs font-medium ${activeTab === tab.id ? "text-violet-200" : "text-slate-500"}`}>
                      {tab.desc}
                    </span>
                  </div>
                </button>
              ))}
            </nav>
          </aside>

          <main className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-12 min-h-[600px] flex flex-col shadow-2xl"
              >
                {activeTab === "profile" && (
                  <section className="space-y-10 flex-1">
                    <div className="flex items-center gap-8 pb-10 border-b border-white/5">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-500 to-purple-600 p-1 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-4xl font-black text-violet-400">A</div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-black text-white">User Profile</h2>
                        <p className="text-slate-400 font-medium">Update your photo and personal details.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <InputBlock label="Display Name" value="Web Dev Intern" icon={<User size={18}/>} />
                      <InputBlock label="Email Address" value="intern@aanseaa.com" icon={<Mail size={18}/>} />
                      <InputBlock label="Professional Role" value="Fullstack Developer" />
                      <InputBlock label="Timezone" value="India Standard Time (IST)" icon={<Globe size={18}/>} />
                    </div>
                  </section>
                )}

                {activeTab === "security" && (
                  <section className="space-y-10 flex-1">
                    <div className="pb-10 border-b border-white/5">
                      <h2 className="text-3xl font-black text-white">Security & Privacy</h2>
                      <p className="text-slate-400 font-medium">Manage your password and authentication.</p>
                    </div>

                    <div className="space-y-4">
                      <ToggleOption title="Two-Factor Authentication" desc="Add an extra layer of security to your account." icon={<Fingerprint size={20} />} active />
                      <ToggleOption title="Session Timeout" desc="Automatically log out after 30 minutes of inactivity." icon={<Shield size={20} />} active={false} />
                    </div>
                  </section>
                )}

                <div className="mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Last synced 2m ago</p>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-white transition-all">Discard</button>
                    <button className="flex-1 md:flex-none px-12 py-4 rounded-2xl font-black bg-violet-600 text-white hover:bg-violet-500 shadow-xl shadow-violet-900/20 transition-all active:scale-95 flex items-center justify-center gap-2">
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

function InputBlock({ label, value, icon }: { label: string; value: string; icon?: any }) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors">{icon}</div>}
        <input 
          defaultValue={value}
          className={`w-full ${icon ? 'pl-12' : 'px-5'} py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold text-white outline-none focus:bg-white/10 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 transition-all`} 
        />
      </div>
    </div>
  );
}

function ToggleOption({ title, desc, icon, active }: { title: string; desc: string; icon: any, active: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/5 hover:border-violet-500/30 transition-all group">
      <div className="flex gap-4 items-center">
        <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-violet-400 shadow-sm transition-colors">{icon}</div>
        <div>
          <h4 className="font-bold text-white">{title}</h4>
          <p className="text-sm text-slate-500 font-medium">{desc}</p>
        </div>
        </div>
      <div className={`w-12 h-7 rounded-full transition-all relative cursor-pointer ${active ? 'bg-violet-600' : 'bg-white/10'}`}>
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
      </div>
    </div>
  );
}