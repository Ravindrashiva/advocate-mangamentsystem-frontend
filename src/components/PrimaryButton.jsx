import React from "react";

export default function PrimaryButton({ children, onClick, accent = "#1E3A8A", type = "button", full }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${full ? "w-full" : ""} inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.98]`}
      style={{ background: `linear-gradient(135deg, ${accent}, #2563EB)`, boxShadow: `0 10px 20px -8px ${accent}99` }}
    >
      {children}
    </button>
  );
}
