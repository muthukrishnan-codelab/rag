"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  text,
  variant = "primary",
  onClick,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!onClick) return;
    setLoading(true);

    setTimeout(() => {
      onClick();
      setLoading(false);
    }, 800);
  };

  const baseStyle =
    "px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-md",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${baseStyle} ${variants[variant]} ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {text}
    </button>
  );
}