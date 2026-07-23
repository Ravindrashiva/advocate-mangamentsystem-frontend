import React, { useState } from "react";
import { FileText, Plus, Trash2, Gavel, Users } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import EmptyState from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import AddDocumentModal from "../components/AddDocumentModal";

export default function Documents() {
  const { documents, advocates, clients, deleteDocument, user, cases } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  // Find matching advocate profile
  const currentAdv = advocates.find((a) => a.email === user?.email);
  const isAdvocate = user?.role === "advocate";

  const myCases = isAdvocate ? cases.filter((c) => c.advocateId === currentAdv?.id) : cases;
  const myClients = isAdvocate ? clients.filter((c) => c.advocateId === currentAdv?.id) : clients;

  const displayDocs = isAdvocate
    ? documents.filter((d) => 
        (d.ownerType === "case" && myCases.some((c) => c.id === d.ownerId)) ||
        (d.ownerType === "client" && myClients.some((c) => c.id === d.ownerId)) ||
        (d.ownerType === "advocate" && d.ownerId === currentAdv?.id)
      )
    : documents;

  const ownerName = (d) => {
    const list = d.ownerType === "advocate" ? advocates : clients;
    return list.find((p) => p.id === d.ownerId)?.name || "—";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <FileText size={20} className="text-orange" />
          <h2 className="text-lg font-extrabold text-slate-800">All Documents</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-orange">{displayDocs.length}</span>
        </div>
        <PrimaryButton accent="#F97316" onClick={() => setShowAdd(true)}><Plus size={16} /> Upload Document</PrimaryButton>
      </div>

      {displayDocs.length === 0 ? (
        <EmptyState accent="#F97316" icon={FileText} label="No documents uploaded yet" onAdd={() => setShowAdd(true)} cta="Upload Document" />
      ) : (
        <GlassCard accent="#F97316">
          <div className="divide-y divide-slate-100">
            {displayDocs.map((d) => (
              <div key={d.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/60 transition group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center"><FileText size={16} className="text-orange" /></div>
                  <div>
                    <div className="text-sm font-bold text-slate-700">{d.title}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      {d.ownerType === "advocate" ? <Gavel size={11} className="text-purple" /> : <Users size={11} className="text-emerald" />}
                      {ownerName(d)} · {d.uploadedOn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange/10 text-orange">{d.category}</span>
                  <button onClick={() => deleteDocument(d.id)} className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-danger p-1.5">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {showAdd && <AddDocumentModal onClose={() => setShowAdd(false)} />}
    </div>
  );
}
