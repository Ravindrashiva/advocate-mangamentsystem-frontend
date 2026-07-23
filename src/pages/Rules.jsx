import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RefreshCw, Search, ArrowRight, ShieldCheck, ListTodo } from "lucide-react";
import GlassCard from "../components/GlassCard";

const ipcBnsData = [
  { oldSec: "Sec 302 IPC", newSec: "Sec 101 BNS", title: "Punishment for murder", status: "Slight phrasing updates" },
  { oldSec: "Sec 378 IPC", newSec: "Sec 303 BNS", title: "Theft", status: "Definition consolidated" },
  { oldSec: "Sec 420 IPC", newSec: "Sec 318 BNS", title: "Cheating", status: "Section renumbered and updated" },
];

const crpcBnssData = [
  { oldSec: "Sec 154 CrPC", newSec: "Sec 173 BNSS", title: "Information in cognizable cases (FIR)", status: "Zero FIR statutory recognition" },
  { oldSec: "Sec 167 CrPC", newSec: "Sec 187 BNSS", title: "Procedure when investigation cannot be completed in 24 hours", status: "Police custody timeline restructured" },
];

const bsaData = [
  { oldSec: "Sec 65B Evidence Act", newSec: "Sec 63 BSA", title: "Admissibility of electronic records", status: "Certificate requirement clarified & expanded" }
];

const trackerUpdates = [
  { date: "2026-07-01", law: "BNS", desc: "Notification regarding enforcement of newly implemented sections.", priority: "High" },
  { date: "2026-06-15", law: "BNSS", desc: "State Amendment updates for summary trial procedures.", priority: "Medium" }
];

export default function Rules() {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const tab = searchParams.get("tab");
  const [query, setQuery] = useState("");

  let title = "Rule Changes & Amendments";
  let activeData = [];

  if (from === "ipc") {
    title = "IPC → BNS (Bharatiya Nyaya Sanhita)";
    activeData = ipcBnsData;
  } else if (from === "crpc") {
    title = "CrPC → BNSS (Bharatiya Nagarik Suraksha Sanhita)";
    activeData = crpcBnssData;
  } else if (from === "evidence") {
    title = "Evidence Act → BSA (Bharatiya Sakshya Adhiniyam)";
    activeData = bsaData;
  } else if (tab === "tracker") {
    title = "Amendment Tracker";
  }

  const filteredData = activeData.filter((d) =>
    d.oldSec.toLowerCase().includes(query.toLowerCase()) ||
    d.newSec.toLowerCase().includes(query.toLowerCase()) ||
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <RefreshCw size={20} className="text-red-500" />
          <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
        </div>
      </div>

      {tab !== "tracker" ? (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search old section, new section or keyword..."
              className="pl-9 pr-4 py-2.5 w-full rounded-xl bg-white border border-slate-200 outline-none text-sm focus:border-red-500 transition"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredData.map((d, index) => (
              <GlassCard key={index} accent="#EF4444">
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{d.oldSec}</span>
                    <ArrowRight size={16} className="text-red-500" />
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">{d.newSec}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{d.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{d.status}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold shrink-0">
                    <ShieldCheck size={14} /> Approved
                  </div>
                </div>
              </GlassCard>
            ))}
            {filteredData.length === 0 && (
              <div className="text-center py-10 text-slate-400 font-medium">No rule matches found.</div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><ListTodo size={16} /> Latest Notifications & Amendments</h3>
          <div className="grid grid-cols-1 gap-4">
            {trackerUpdates.map((t, index) => (
              <GlassCard key={index} accent="#EF4444">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{t.law} Update</span>
                    <span className="text-xs text-slate-400 font-bold">{t.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold">{t.desc}</p>
                  <div className="mt-3 text-[10px] font-extrabold uppercase tracking-wide" style={{ color: t.priority === "High" ? "#EF4444" : "#FBBF24" }}>
                    Priority: {t.priority}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
