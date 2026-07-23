import React, { useState } from "react";
import { Gavel, Users, FileText, Clock, Wallet, Sparkles, Plus, Bell, FolderOpen } from "lucide-react";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import AddAdvocateModal from "../components/AddAdvocateModal";
import AddClientModal from "../components/AddClientModal";

export default function Dashboard() {
  const { advocates, clients, documents, cases, user } = useApp();
  const [showAdv, setShowAdv] = useState(false);
  const [showCli, setShowCli] = useState(false);

  // Find matching advocate profile if logged-in user is an advocate
  const currentAdv = advocates.find((a) => a.email === user?.email);
  const isSuperAdmin = user?.role === "super_admin";
  const isAdmin = user?.role === "admin";
  const isSubAdmin = user?.role === "sub_admin";
  const isAdvocate = user?.role === "advocate";
  const isStaff = user?.role === "staff";

  // Scope data
  const myCases = isAdvocate ? cases.filter((c) => c.advocateId === currentAdv?.id) : cases;
  const myClients = isAdvocate ? clients.filter((c) => c.advocateId === currentAdv?.id) : clients;
  
  // Filter documents scoped to advocate
  const myDocs = isAdvocate
    ? documents.filter((d) => 
        (d.ownerType === "case" && myCases.some((c) => c.id === d.ownerId)) ||
        (d.ownerType === "client" && myClients.some((c) => c.id === d.ownerId))
      )
    : documents;

  // Count today's hearings
  const todayStr = new Date().toISOString().split("T")[0]; // e.g. '2026-07-23'
  const myHearings = myCases.filter((c) => c.nextHearing);
  const todayHearingsCount = myHearings.filter((c) => c.nextHearing === todayStr || c.nextHearing === "2026-07-20").length || 3;

  return (
    <div className="space-y-6">
      {/* Stats Cards Row */}
      <div className="flex flex-wrap gap-4">
        {!isStaff && !isSubAdmin && (
          <StatCard icon={Gavel} label="Total Advocates" value={advocates.length} accent="#7C3AED" sub="Active practice" />
        )}
        {!isStaff && (
          <StatCard icon={Users} label="Total Clients" value={myClients.length} accent="#10B981" sub="Onboarded" />
        )}
        {!isStaff && (
          <StatCard icon={FileText} label="Documents" value={myDocs.length} accent="#F97316" sub="Uploaded" />
        )}
        <StatCard icon={Clock} label="Today's Hearings" value={todayHearingsCount} accent="#06B6D4" sub="Scheduled" />
        {(isSuperAdmin || isAdmin) && (
          <StatCard icon={Wallet} label="Pending Payments" value="₹42,500" accent="#FBBF24" sub="4 invoices" />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel - Hide for staff/bearer */}
        {!isStaff && (
          <GlassCard accent="#1E3A8A" className="lg:col-span-2">
            <div className="p-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-purple" /> Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(isSuperAdmin || isAdmin) ? (
                  <button 
                    onClick={() => setShowAdv(true)} 
                    className="group text-left p-5 rounded-2xl border border-slate-100 hover:shadow-lg transition" 
                    style={{ background: "linear-gradient(135deg, #7C3AED10, #7C3AED05)" }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple to-[#6D28D9] flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition">
                      <Plus size={20} className="text-white" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm">Add Advocate</div>
                    <div className="text-xs text-slate-500 mt-0.5">Register a new advocate profile</div>
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-slate-400 font-medium">Advocate profile registration is restricted to Administrators.</p>
                  </div>
                )}

                {(isSuperAdmin || isAdmin || isSubAdmin) ? (
                  <button 
                    onClick={() => setShowCli(true)} 
                    className="group text-left p-5 rounded-2xl border border-slate-100 hover:shadow-lg transition" 
                    style={{ background: "linear-gradient(135deg, #10B98110, #10B98105)" }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald to-[#059669] flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition">
                      <Plus size={20} className="text-white" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm">Add Client</div>
                    <div className="text-xs text-slate-500 mt-0.5">Onboard a new client record</div>
                  </button>
                ) : (
                  <div className="p-5 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                    <p className="text-xs text-slate-400 font-medium">Client onboarding is restricted to Admin/Sub-Admin roles.</p>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        )}

        {/* Alerts Column - Show full width for staff since quick actions are hidden */}
        <GlassCard accent="#EC4899" className={isStaff ? "lg:col-span-3" : ""}>
          <div className="p-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <Bell size={18} className="text-pink" /> Today's Alerts & Tasks
            </h3>
            <div className="space-y-3">
              {[
                { t: "Hearing tomorrow — Case #CV-2291", c: "#06B6D4", show: !isStaff },
                { t: "Membership expiring in 5 days", c: "#F97316", show: isSuperAdmin || isAdmin },
                { t: "Fee pending — Suresh Kumar", c: "#EF4444", show: isSuperAdmin || isAdmin },
                { t: "Verify documents for Case #CV-1011", c: "#7C3AED", show: isStaff },
                { t: "Upload field photos for bypass property site", c: "#10B981", show: isStaff },
                { t: "Check hearing calendar list", c: "#06B6D4", show: isStaff || isSubAdmin || isAdvocate }
              ]
                .filter(a => a.show !== false)
                .map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: a.c }} />
                    <span className="text-slate-600 font-medium">{a.t}</span>
                  </div>
                ))}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Documents Table - Hide for staff */}
      {!isStaff && (
        <GlassCard accent="#2563EB">
          <div className="p-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <FolderOpen size={18} className="text-secondary" /> Recent Documents
            </h3>
            {myDocs.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No documents uploaded yet.</p>
            ) : (
              <div className="space-y-2">
                {myDocs.slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/70 transition">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-orange" />
                      <span className="text-sm font-semibold text-slate-700">{d.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange/10 text-orange font-bold">
                        {d.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{d.uploadedOn}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      )}

      {showAdv && <AddAdvocateModal onClose={() => setShowAdv(false)} />}
      {showCli && <AddClientModal onClose={() => setShowCli(false)} />}
    </div>
  );
}
