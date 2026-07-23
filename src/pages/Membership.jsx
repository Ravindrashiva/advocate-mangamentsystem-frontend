import React from "react";
import { Shield, Sparkles, Check, CreditCard } from "lucide-react";
import GlassCard from "../components/GlassCard";

const TIERS = [
  { name: "Silver Desk", price: "₹2,500/mo", features: ["Up to 5 Advocates", "Up to 100 Cases", "Basic Case Diary", "Email Alerts"], active: false, accent: "#94A3B8" },
  { name: "Gold Firm (Current)", price: "₹7,500/mo", features: ["Up to 25 Advocates", "Unlimited Cases", "Advanced Workflow Approvals", "SMS & WhatsApp Alerts", "Bare Acts Library"], active: true, accent: "#FBBF24" },
  { name: "Platinum Enterprise", price: "Custom", features: ["Unlimited Advocates", "Dedicated Support", "Full Analytics & Reports", "Automated Backup & API Access"], active: false, accent: "#7C3AED" }
];

export default function Membership() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 mb-2">
        <Shield size={20} className="text-amber-500" />
        <h2 className="text-lg font-extrabold text-slate-800">Membership Module</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => (
          <GlassCard key={tier.name} accent={tier.accent}>
            <div className="p-6 flex flex-col justify-between h-full relative">
              {tier.active && (
                <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <Sparkles size={10} /> Active Plan
                </span>
              )}
              <div>
                <h3 className="text-lg font-extrabold text-slate-800 mb-1">{tier.name}</h3>
                <div className="text-2xl font-black text-slate-900 mb-6">{tier.price}</div>
                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                      <Check size={14} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  tier.active 
                    ? "bg-slate-100 text-slate-500 cursor-default" 
                    : "bg-[#1E3A8A] text-white hover:brightness-110 shadow-md"
                }`}
              >
                <CreditCard size={13} />
                {tier.active ? "Current Plan" : "Upgrade Plan"}
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
