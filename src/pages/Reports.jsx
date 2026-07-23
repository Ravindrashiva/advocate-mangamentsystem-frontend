import React from "react";
import { useSearchParams } from "react-router-dom";
import { BarChart3, TrendingUp, Calendar, Users, DollarSign, Award } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function Reports() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "cases";

  let title = "Reports & Analytics";
  let iconColor = "text-purple-500";
  let content = null;

  if (type === "cases") {
    title = "Case Management Analytics";
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <GlassCard accent="#8B5CF6">
          <div className="p-5 space-y-3">
            <h4 className="font-bold text-slate-700 text-sm">Case Status Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600"><span>Active Cases</span><span className="font-bold text-slate-800">45</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: "70%" }} /></div>
              <div className="flex justify-between text-xs font-semibold text-slate-600"><span>Pending Approval</span><span className="font-bold text-slate-800">12</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-amber-500 h-2 rounded-full" style={{ width: "20%" }} /></div>
              <div className="flex justify-between text-xs font-semibold text-slate-600"><span>Closed Cases</span><span className="font-bold text-slate-800">8</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2"><div className="bg-slate-400 h-2 rounded-full" style={{ width: "10%" }} /></div>
            </div>
          </div>
        </GlassCard>
        <GlassCard accent="#8B5CF6">
          <div className="p-5 space-y-3">
            <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><TrendingUp size={16} /> Win / Loss Analytics</h4>
            <p className="text-xs text-slate-500 font-medium">Historical disposition rates of litigation matters resolved during the current year.</p>
            <div className="flex items-center gap-6 pt-2">
              <div className="text-center"><div className="text-xl font-black text-emerald-600">82%</div><div className="text-[10px] text-slate-400 font-bold uppercase">Favored Orders</div></div>
              <div className="text-center"><div className="text-xl font-black text-red-500">18%</div><div className="text-[10px] text-slate-400 font-bold uppercase">Appealed / Lost</div></div>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  } else if (type === "advocates") {
    title = "Advocate Workload Reports";
    content = (
      <GlassCard accent="#8B5CF6">
        <div className="p-5">
          <h4 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-1.5"><Award size={16} /> Assigned Cases by Advocate</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Ramesh Varma (Senior)</span>
              <span className="font-semibold text-slate-500">18 Cases Active</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Priya Nair (Junior)</span>
              <span className="font-semibold text-slate-500">9 Cases Active</span>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  } else if (type === "clients") {
    title = "Client Retention & Growth";
    content = (
      <GlassCard accent="#8B5CF6">
        <div className="p-5 space-y-3">
          <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Users size={16} /> Client Demographics</h4>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl text-center">
              <div className="text-2xl font-extrabold text-slate-800">124</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Corporate Clients</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl text-center">
              <div className="text-2xl font-extrabold text-slate-800">312</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Individual Clients</div>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  } else if (type === "financial") {
    title = "Financial Performance & Collections";
    content = (
      <GlassCard accent="#8B5CF6">
        <div className="p-5 space-y-4">
          <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><DollarSign size={16} /> Monthly Revenue Target</h4>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Billed</span>
              <div className="text-2xl font-extrabold text-slate-800">₹4,25,000</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Collected</span>
              <div className="text-lg font-bold text-emerald-600">₹3,80,000 (89%)</div>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: "89%" }} /></div>
        </div>
      </GlassCard>
    );
  } else {
    title = "Monthly Performance Reviews";
    content = (
      <GlassCard accent="#8B5CF6">
        <div className="p-5 space-y-3">
          <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Calendar size={16} /> Key Milestones Achieved</h4>
          <ul className="text-xs text-slate-600 font-medium space-y-2 list-disc pl-5">
            <li>Completed filing transition for the upcoming courts winter session.</li>
            <li>Resolved 12 property litigation cases successfully.</li>
            <li>Onboarded 5 new corporate retainer clients.</li>
          </ul>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <BarChart3 size={20} className={iconColor} />
        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
      </div>

      {content}
    </div>
  );
}
