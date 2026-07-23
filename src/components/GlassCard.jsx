import React from "react";

export default function GlassCard({ children, className = "", accent = "#2563EB", ...rest }) {
  return (
    <div
      className={`relative rounded-3xl p-[1.5px] ${className}`}
      style={{ background: `linear-gradient(135deg, ${accent}55, transparent 40%, ${accent}22)` }}
      {...rest}
    >
      <div className="rounded-3xl h-full bg-white/90 backdrop-blur-xl shadow-soft border border-white/60">
        {children}
      </div>
    </div>
  );
}
