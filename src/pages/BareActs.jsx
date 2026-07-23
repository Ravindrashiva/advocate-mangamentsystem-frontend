import React, { useState } from "react";
import { BookOpen, Search, Bookmark } from "lucide-react";
import GlassCard from "../components/GlassCard";

const ACTS = [
  { code: "CPC", name: "Code of Civil Procedure", accent: "#7C3AED" },
  { code: "CrPC → BNSS", name: "Code of Criminal Procedure → Bharatiya Nagarik Suraksha Sanhita", accent: "#06B6D4" },
  { code: "IPC → BNS", name: "Indian Penal Code → Bharatiya Nyaya Sanhita", accent: "#F97316" },
  { code: "Evidence Act → BSA", name: "Indian Evidence Act → Bharatiya Sakshya Adhiniyam", accent: "#EC4899" },
  { code: "TPA", name: "Transfer of Property Act", accent: "#10B981" },
  { code: "Registration Act", name: "The Registration Act, 1908", accent: "#FBBF24" },
];

export default function BareActs() {
  const [q, setQ] = useState("");
  const filtered = ACTS.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()) || a.code.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          <BookOpen size={20} className="text-pink" />
          <h2 className="text-lg font-extrabold text-slate-800">Bare Acts — Digital Legal Library</h2>
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search acts, sections..." className="pl-9 pr-4 py-2.5 rounded-xl bg-slate-100/80 border border-transparent focus:border-secondary focus:bg-white outline-none text-sm w-64 transition" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((a) => (
          <GlassCard key={a.code} accent={a.accent}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${a.accent}15` }}>
                  <BookOpen size={19} style={{ color: a.accent }} />
                </div>
                <Bookmark size={16} className="text-slate-300 hover:text-slate-500 cursor-pointer transition" />
              </div>
              <div className="font-bold text-slate-800 text-sm">{a.code}</div>
              <div className="text-xs text-slate-500 mt-1 leading-relaxed">{a.name}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
