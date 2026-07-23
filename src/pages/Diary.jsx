import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Notebook, FileText, Paperclip, Plus, Calendar } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import { useApp } from "../context/AppContext";

const diaryEntries = [
  { id: 1, caseNo: "CV-2291", title: "Property Dispute - Suresh vs State", date: "2026-07-17", description: "Filed the rejoinder in District Court. Next hearing set for arguments.", category: "Daily Diary", createdBy: "advocate@legaldesk.in" },
  { id: 2, caseNo: "CV-1044", title: "Tenant Eviction - Anil vs Roy", date: "2026-07-18", description: "Cross-examination of witness completed. Preparing oral arguments.", category: "Hearing Notes", createdBy: "staff@legaldesk.in" },
  { id: 3, caseNo: "CV-9912", title: "Acquisition Dispute - Metro vs City", date: "2026-07-19", description: "Land valuation report copy uploaded.", category: "Attachments", fileName: "land_valuation_report.pdf", createdBy: "superadmin@legaldesk.in" }
];

export default function Diary() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "diary"; // diary, notes, attachments
  const { user, advocates, cases } = useApp();
  const [entries, setEntries] = useState(diaryEntries);
  const [showAdd, setShowAdd] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [newCase, setNewCase] = useState("CV-2291");

  // Determine current advocate
  const currentAdv = advocates.find((a) => a.email === user?.email);

  const filteredEntries = entries.filter((e) => {
    // 1. Filter by category
    if (tab === "notes" && e.category !== "Hearing Notes") return false;
    if (tab === "attachments" && e.category !== "Attachments") return false;
    if (tab === "diary" && e.category !== "Daily Diary") return false;

    // 2. Scope by role: Advocate only sees entries for cases assigned to them
    if (user?.role === "advocate") {
      const myCases = cases.filter((c) => c.advocateId === currentAdv?.id);
      return myCases.some((c) => c.caseNo === e.caseNo);
    }

    // 3. Scope by role: Staff/Bearer sees Day Book (notes) entries scoped to their submissions
    if (user?.role === "staff" && tab === "notes") {
      return e.createdBy === user?.email;
    }

    return true;
  });

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newDesc) return;
    const category = tab === "notes" ? "Hearing Notes" : tab === "attachments" ? "Attachments" : "Daily Diary";
    const newEntry = {
      id: Date.now(),
      caseNo: newCase,
      title: newCase === "CV-2291" ? "Property Dispute - Suresh vs State" : "General Case Entry",
      date: new Date().toISOString().split("T")[0],
      description: newDesc,
      category,
      fileName: category === "Attachments" ? "uploaded_doc.pdf" : undefined,
      createdBy: user?.email || "unknown@legaldesk.in"
    };
    setEntries([newEntry, ...entries]);
    setNewDesc("");
    setShowAdd(false);
  };

  // Staff can view Case Diary but view/upload only, no edit. They can edit Day Book (tab === "notes").
  const canAddEntry = !(user?.role === "staff" && tab !== "notes");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Notebook size={20} className="text-pink-500" />
          <h2 className="text-lg font-extrabold text-slate-800">
            {tab === "notes" ? "Hearing Notes / Day Book" : tab === "attachments" ? "Attachments" : "Daily Diary"}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-pink-500">{filteredEntries.length}</span>
        </div>
        {canAddEntry && (
          <PrimaryButton accent="#EC4899" onClick={() => setShowAdd(true)}>
            <Plus size={16} /> New Entry
          </PrimaryButton>
        )}
      </div>

      {showAdd && (
        <GlassCard accent="#EC4899">
          <form onSubmit={handleAddEntry} className="p-5 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">Add New {tab === "notes" ? "Hearing Note" : tab === "attachments" ? "Attachment Note" : "Diary Entry"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Case Number</label>
                <select value={newCase} onChange={(e) => setNewCase(e.target.value)} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none">
                  <option value="CV-2291">CV-2291 (Property Dispute)</option>
                  <option value="CV-1044">CV-1044 (Tenant Eviction)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description / Details</label>
                <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Enter details..." className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none" required />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <PrimaryButton accent="#EC4899" type="submit">Submit</PrimaryButton>
            </div>
          </form>
        </GlassCard>
      )}

      {filteredEntries.length === 0 ? (
        <div className="text-center py-10 text-slate-400 font-medium">No records found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEntries.map((e) => (
            <GlassCard key={e.id} accent="#EC4899">
              <div className="p-5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-pink-500">{e.caseNo}</span>
                    <h4 className="font-bold text-slate-800 text-sm">{e.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{e.description}</p>
                  {e.fileName && (
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold pt-1">
                      <Paperclip size={12} />
                      <span>{e.fileName}</span>
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1 shrink-0">
                  <Calendar size={12} /> {e.date}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
