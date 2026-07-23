import React from "react";
import { Plus } from "lucide-react";
import GlassCard from "./GlassCard";
import PrimaryButton from "./PrimaryButton";

export default function EmptyState({ accent, icon: Icon, label, onAdd, cta }) {
  return (
    <GlassCard accent={accent}>
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${accent}15` }}>
          <Icon size={26} style={{ color: accent }} />
        </div>
        <p className="text-slate-500 text-sm mb-4 font-medium">{label}</p>
        {onAdd && <PrimaryButton accent={accent} onClick={onAdd}><Plus size={16} /> {cta}</PrimaryButton>}
      </div>
    </GlassCard>
  );
}
