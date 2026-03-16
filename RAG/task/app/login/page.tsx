"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Zap, Cpu, Share2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    const defaultUsers = [
      { email: "admin@gmail.com", password: "admin123", role: "admin" },
      { email: "vendor@gmail.com", password: "vendor123", role: "vendor" },
    ];

    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const allUsers = [...defaultUsers, ...storedUsers];

    const user = allUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("token", "demo-token");
    localStorage.setItem("role", user.role);
    localStorage.setItem("userEmail", user.email);

    router.push("/workflow-builder");
  };

  const features = [
    { icon: <Zap className="text-yellow-400" size={20} />, text: "Drag & Drop Workflow Builder" },
    { icon: <Cpu className="text-blue-400" size={20} />, text: "AI Powered Query Testing" },
    { icon: <Share2 className="text-purple-400" size={20} />, text: "Connect LLMs, Prompts & Retrievers" },
    { icon: <ShieldCheck className="text-green-400" size={20} />, text: "Secure Role Based Access" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
      <div className="flex w-full max-w-[1200px] h-[750px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">

        <div className="w-1/2 relative flex flex-col justify-center p-16 overflow-hidden bg-[#0f172a]">

          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-gray-500">
                  RAG Workflow
                </span>
                <br />
                <span className="text-yellow-400">Builder</span>
              </h1>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
                Master your data with high-performance Retrieval-Augmented Generation.
                Deploy complex AI workflows in minutes, not weeks.
              </p>
            </motion.div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="p-2 rounded-lg bg-black/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <span className="text-gray-200 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-black p-16 text-white flex flex-col justify-center border-l border-white/5">
          <h2 className="text-2xl font-semibold mb-1 text-center">Login</h2>

          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your credentials to access your account
          </p>

          {error && (
            <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
          )}

          <div className="relative mb-4">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1f1f1f] border border-gray-700 rounded-md pl-10 pr-4 py-3 text-sm outline-none focus:border-yellow-400 transition-all"
            />
          </div>

          <div className="relative mb-4">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1f1f1f] border border-gray-700 rounded-md pl-10 pr-10 py-3 text-sm outline-none focus:border-yellow-400 transition-all"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-[1px] bg-gray-800"></div>
            <span className="text-gray-500 text-sm font-medium uppercase tracking-tighter">or</span>
            <div className="flex-1 h-[1px] bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="border border-gray-700 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-[#111] transition-all group">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 group-hover:scale-110 transition-transform"/>
              <span className="text-sm">Google</span>
            </button>

            <button className="border border-gray-700 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-[#111] transition-all group">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-5 h-5 group-hover:scale-110 transition-transform"/>
              <span className="text-sm">Microsoft</span>
            </button>
          </div>

          <p className="text-sm text-center mt-8 text-gray-500">
            Not a member?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-yellow-400 font-medium hover:underline cursor-pointer ml-1"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}