import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { NotebookPen, Plus, Calendar, Gavel, Users, Clock, CheckCircle, ShieldCheck } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import AddCaseModal from "../components/AddCaseModal";

const STATUS_COLOR = { Active: "#10B981", "Pending Approval": "#FBBF24", Closed: "#94A3B8" };

const LEVEL_NAMES = {
  1: "Level 1 – Staff Verification",
  2: "Level 2 – Advocate Verification",
  3: "Level 3 – Admin Approval",
  4: "Level 4 – Super Admin Final Approval",
  active: "Active"
};

export default function Cases() {
  const { cases, advocates, clients, user, setCases } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action");
  const tab = searchParams.get("tab");

  const [showAdd, setShowAdd] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
    if (action === "create") {
      setShowAdd(true);
    }
  }, [action]);

  const handleCloseModal = () => {
    setShowAdd(false);
    if (action === "create") {
      const params = new URLSearchParams(searchParams);
      params.delete("action");
      setSearchParams(params);
    }
  };

  const handleApprove = (caseId, currentLevel) => {
    const commentText = comments[caseId] || "Verification/Approval completed.";
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-IN");
    const timeStr = now.toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' });

    const newHistoryEntry = {
      level: currentLevel,
      approvedBy: user?.email || "unknown@legaldesk.in",
      date: dateStr,
      time: timeStr,
      comments: commentText,
      status: currentLevel === 3 || currentLevel === 4 ? "Approved" : "Verified"
    };

    let nextLevel = currentLevel + 1;
    let nextStatus = "Pending Approval";

    if (currentLevel === 4) {
      nextLevel = "active";
      nextStatus = "Active";
    }

    setCases((prevCases) =>
      prevCases.map((c) => {
        if (c.id === caseId) {
          return {
            ...c,
            status: nextStatus,
            approvalLevel: nextLevel,
            approvalHistory: [...(c.approvalHistory || []), newHistoryEntry]
          };
        }
        return c;
      })
    );

    // Clear comment input
    setComments((prev) => ({ ...prev, [caseId]: "" }));
  };

  // Find matching advocate profile
  const currentAdv = advocates.find((a) => a.email === user?.email);
  const isStaff = user?.role === "staff";
  
  // Staff is restricted to approval workflow only
  const activeTab = isStaff ? "approval" : tab;

  const scopedCases = cases.filter((c) => {
    if (user?.role === "advocate") {
      return c.advocateId === currentAdv?.id;
    }
    return true;
  });

  const filteredCases = scopedCases.filter((c) => {
    if (activeTab === "approval") return c.status === "Pending Approval";
    if (activeTab === "closed") return c.status === "Closed";
    if (activeTab === "calendar") return c.nextHearing;
    return true; // default all
  });

  const currentUserRole = user?.role || "super_admin";

  const canApprove = (c) => {
    if (currentUserRole === "super_admin" && c.approvalLevel === 4) return true;
    if (currentUserRole === "admin" && c.approvalLevel === 3) return true;
    if (currentUserRole === "advocate" && c.approvalLevel === 2) {
      return c.advocateId === currentAdv?.id;
    }
    if (currentUserRole === "staff" && c.approvalLevel === 1) {
      return true; // In mock data we allow level 1 submissions
    }
    return false;
  };

  const showNewCaseButton = currentUserRole !== "sub_admin" && currentUserRole !== "staff";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <NotebookPen size={20} className="text-cyan" />
          <h2 className="text-lg font-extrabold text-slate-800">
            {activeTab === "approval" && "Case Approvals"}
            {activeTab === "closed" && "Closed Cases"}
            {activeTab === "calendar" && "Hearing Calendar"}
            {!activeTab && "Case Directory"}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-cyan">
            {filteredCases.length}
          </span>
        </div>
        {showNewCaseButton && (
          <PrimaryButton accent="#06B6D4" onClick={() => setShowAdd(true)}>
            <Plus size={16} /> New Case
          </PrimaryButton>
        )}
      </div>

      {filteredCases.length === 0 ? (
        <EmptyState
          accent="#06B6D4"
          icon={NotebookPen}
          label="No cases matches found"
          onAdd={showNewCaseButton ? () => setShowAdd(true) : undefined}
          cta={showNewCaseButton ? "Create Case" : undefined}
        />
      ) : tab === "approval" ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredCases.map((c) => {
            const advocate = advocates.find((a) => a.id === c.advocateId);
            const client = clients.find((cl) => cl.id === c.clientId);
            const isAuthorized = canApprove(c);

            return (
              <GlassCard key={c.id} accent="#FBBF24">
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white bg-amber-500">{c.caseNo}</span>
                      <h4 className="font-bold text-slate-800 text-base">{c.title}</h4>
                    </div>
                    <div className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      Current Stage: {LEVEL_NAMES[c.approvalLevel] || `Level ${c.approvalLevel}`}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500 font-medium">
                    <span>Court: {c.court}</span>
                    {advocate && <span>Advocate: {advocate.name}</span>}
                    {client && <span>Client: {client.name}</span>}
                  </div>

                  {/* Approval History */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> Case Approval Log</div>
                    {(!c.approvalHistory || c.approvalHistory.length === 0) ? (
                      <p className="text-xs text-slate-400 italic pl-1">No approval actions logged yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {c.approvalHistory.map((h, i) => (
                          <div key={i} className="text-xs font-medium text-slate-600 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100/70 pb-2 last:border-0 last:pb-0">
                            <div>
                              <span className="font-bold text-slate-800">{LEVEL_NAMES[h.level] || `Level ${h.level}`}:</span>{" "}
                              <span className="italic">"{h.comments}"</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-bold mt-1 md:mt-0">
                              By {h.approvedBy} on {h.date} at {h.time}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Block */}
                  {isAuthorized ? (
                    <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-end gap-3 justify-between">
                      <div className="w-full md:max-w-md">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Add Comment</label>
                        <input
                          type="text"
                          value={comments[c.id] || ""}
                          onChange={(e) => setComments({ ...comments, [c.id]: e.target.value })}
                          placeholder="Provide approval decision comments..."
                          className="w-full rounded-xl border border-slate-200 p-2.5 text-xs bg-white outline-none focus:border-amber-500 transition"
                        />
                      </div>
                      <PrimaryButton accent="#FBBF24" onClick={() => handleApprove(c.id, c.approvalLevel)}>
                        <CheckCircle size={15} /> Verify & Push to Next Stage
                      </PrimaryButton>
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-slate-400 italic pt-2 pl-1">
                      You are not authorized to act on this stage of case verification.
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : tab === "calendar" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCases.map((c) => {
            const advocate = advocates.find((a) => a.id === c.advocateId);
            const client = clients.find((cl) => cl.id === c.clientId);
            return (
              <GlassCard key={c.id} accent="#06B6D4">
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-primary">{c.caseNo}</span>
                    <span className="text-xs text-slate-400 font-bold flex items-center gap-1"><Clock size={12} /> {c.nextHearing}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{c.title}</h4>
                  <div className="text-xs text-slate-500 font-medium space-y-1.5 pt-2 border-t border-slate-100">
                    <div>Court: {c.court}</div>
                    {advocate && <div>Advocate: {advocate.name}</div>}
                    {client && <div>Client: {client.name}</div>}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard accent="#06B6D4">
          <div className="divide-y divide-slate-100">
            {filteredCases.map((c) => {
              const advocate = advocates.find((a) => a.id === c.advocateId);
              const client = clients.find((cl) => cl.id === c.clientId);
              const color = STATUS_COLOR[c.status] || "#94A3B8";
              return (
                <div key={c.id} className="px-6 py-4 hover:bg-slate-50/60 transition">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-primary">{c.caseNo}</span>
                      <span className="text-sm font-bold text-slate-800">{c.title}</span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: `${color}18`, color }}>{c.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500 font-medium mt-2">
                    <span>{c.court}</span>
                    {c.nextHearing && <span className="flex items-center gap-1"><Calendar size={12} /> Next: {c.nextHearing}</span>}
                    {advocate && <span className="flex items-center gap-1"><Gavel size={12} className="text-purple" /> {advocate.name}</span>}
                    {client && <span className="flex items-center gap-1"><Users size={12} className="text-emerald" /> {client.name}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {showAdd && <AddCaseModal onClose={handleCloseModal} />}
    </div>
  );
}
