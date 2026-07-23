import React from "react";
import { TrendingUp } from "lucide-react";
import GlassCard from "./GlassCard";

export default function StatCard({ icon: Icon, label, value, accent, sub }) {
  return (
    <GlassCard accent={accent} className="flex-1 min-w-[180px]">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}
          >
            <Icon size={20} className="text-white" strokeWidth={2.2} />
          </div>
          <TrendingUp size={16} style={{ color: accent }} className="opacity-60" />
        </div>
        <div className="text-2xl font-extrabold text-slate-800 tracking-tight">{value}</div>
        <div className="text-xs font-medium text-slate-500 mt-0.5">{label}</div>
        {sub && <div className="text-[11px] mt-1 font-semibold" style={{ color: accent }}>{sub}</div>}
      </div>
    </GlassCard>
  );
}
