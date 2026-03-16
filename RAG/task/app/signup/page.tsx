"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {

const router = useRouter();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [error,setError] = useState("");
const [success,setSuccess] = useState("");

const [showPassword,setShowPassword] = useState(false);
const [showConfirmPassword,setShowConfirmPassword] = useState(false);

const handleSignup = () => {

const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

setError("");

if(!name){
setError("Full name is required");
return;
}

if(!emailRegex.test(email)){
setError("Enter a valid email address");
return;
}

if(password.length < 6){
setError("Password must be at least 6 characters");
return;
}

if(password !== confirmPassword){
setError("Passwords do not match");
return;
}

const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

const userExists = existingUsers.find((u:any)=>u.email === email);

if(userExists){
setError("User already exists");
return;
}

const newUser = { name,email,password,role:"user" };

existingUsers.push(newUser);

localStorage.setItem("users",JSON.stringify(existingUsers));

setSuccess("Account created successfully");

setTimeout(()=>{
router.push("/login");
},2000);

};

return (

<div className="min-h-screen flex items-center justify-center bg-[#2b2b2b]">

<div className="flex w-[1300px] h-[700px] rounded-2xl overflow-hidden shadow-2xl">

<div className="w-1/2 relative text-white flex flex-col justify-center p-16 overflow-hidden">

<img
src="/images/ai-network.jpg"
className="absolute inset-0 w-full h-full object-cover opacity-60"
/>

<div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#0f172a]/80 to-black"></div>

<div className="relative z-10 max-w-lg">

<h1 className="text-5xl font-bold mb-4">
RAG Workflow Builder
</h1>

<p className="text-gray-300 text-lg mb-8">
Create an account to start building AI powered workflows.
</p>

<div className="space-y-6 text-gray-200 text-lg">

<div className="flex gap-4">⚡ Drag & Drop Workflow Builder</div>
<div className="flex gap-4">🤖 AI Powered Query Testing</div>
<div className="flex gap-4">🧠 Connect LLMs, Prompts & Retrievers</div>
<div className="flex gap-4">🔐 Secure Role Based Access</div>

</div>

</div>

</div>

<div className="w-1/2 bg-black p-16 text-white flex flex-col justify-center">

<h2 className="text-2xl font-semibold mb-1 text-center">
Create Account
</h2>

<p className="text-gray-400 text-sm text-center mb-6">
Register to start using RAG Workflow Builder
</p>

{error && (

<p className="text-red-400 text-sm mb-3 text-center">
{error}
</p>
)}

{success && (

<div className="bg-green-600 text-white text-sm p-3 rounded-md mb-4 text-center">
{success}
</div>
)}

<div className="relative mb-4">

<User className="absolute left-3 top-3 text-gray-400" size={18}/>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full bg-[#1f1f1f] border border-gray-700 rounded-md pl-10 pr-4 py-3 text-sm outline-none focus:border-yellow-400"
/>

</div>

<div className="relative mb-4">

<Mail className="absolute left-3 top-3 text-gray-400" size={18}/>

<input
type="email"
placeholder="[email@example.com](mailto:email@example.com)"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full bg-[#1f1f1f] border border-gray-700 rounded-md pl-10 pr-4 py-3 text-sm outline-none focus:border-yellow-400"
/>

</div>

<div className="relative mb-4">

<Lock className="absolute left-3 top-3 text-gray-400" size={18}/>

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full bg-[#1f1f1f] border border-gray-700 rounded-md pl-10 pr-10 py-3 text-sm outline-none focus:border-yellow-400"
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-3 text-gray-400 hover:text-white"

>

{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>} </button>

</div>

<div className="relative mb-4">

<Lock className="absolute left-3 top-3 text-gray-400" size={18}/>

<input
type={showConfirmPassword ? "text" : "password"}
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
className="w-full bg-[#1f1f1f] border border-gray-700 rounded-md pl-10 pr-10 py-3 text-sm outline-none focus:border-yellow-400"
/>

<button
type="button"
onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
className="absolute right-3 top-3 text-gray-400 hover:text-white"

>

{showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>} </button>

</div>

<button
onClick={handleSignup}
className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition"

>

Register </button>

<p className="text-sm text-center mt-6 text-gray-400">
Already have an account?
<span
onClick={()=>router.push("/login")}
className="text-yellow-400 cursor-pointer ml-1"
>
Login
</span>
</p>

</div>

</div>

</div>

);
}
