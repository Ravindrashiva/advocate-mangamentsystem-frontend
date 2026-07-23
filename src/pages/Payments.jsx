import React from "react";
import { useSearchParams } from "react-router-dom";
import { Wallet } from "lucide-react";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";

const rows = [
  { name: "Suresh Kumar", type: "Client Payment", amount: "₹15,000", status: "Paid", color: "#10B981" },
  { name: "Ramesh Varma", type: "Advocate Fee", amount: "₹8,500", status: "Pending", color: "#FBBF24" },
  { name: "Office Rent", type: "Office Expense", amount: "₹12,000", status: "Paid", color: "#10B981" },
  { name: "Priya Nair", type: "Advocate Fee", amount: "₹7,000", status: "Pending", color: "#FBBF24" },
];

export default function Payments() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const filteredRows = rows.filter((r) => {
    if (tab === "advocate") return r.type === "Advocate Fee";
    if (tab === "expenses") return r.type === "Office Expense";
    if (tab === "pending") return r.status === "Pending";
    if (tab === "receipts") return r.status === "Paid";
    return r.type === "Client Payment" || !tab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <StatCard icon={Wallet} label="Total Collected" value="₹27,000" accent="#10B981" sub="This month" />
        <StatCard icon={Wallet} label="Pending Payments" value="₹15,500" accent="#FBBF24" sub="2 invoices" />
        <StatCard icon={Wallet} label="Office Expenses" value="₹12,000" accent="#F97316" sub="This month" />
      </div>

      <GlassCard accent="#FBBF24">
        <div className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">
            {tab === "advocate" && "Advocate Fees"}
            {tab === "expenses" && "Office Expenses"}
            {tab === "pending" && "Pending Payments"}
            {tab === "receipts" && "Paid Receipts"}
            {(!tab || tab === "client") && "Client Payment History"}
          </h3>
          <div className="divide-y divide-slate-100">
            {filteredRows.map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3.5">
                <div>
                  <div className="text-sm font-bold text-slate-700">{r.name}</div>
                  <div className="text-xs text-slate-400">{r.type}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-700">{r.amount}</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${r.color}18`, color: r.color }}>{r.status}</span>
                </div>
              </div>
            ))}
            {filteredRows.length === 0 && (
              <div className="text-center py-6 text-slate-400 font-medium">No payment history found.</div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
