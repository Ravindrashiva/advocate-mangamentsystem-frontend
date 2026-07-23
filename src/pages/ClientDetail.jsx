import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Phone, Mail, MapPin, BadgeCheck, Building2, FolderOpen, Upload, Trash2, FileText } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import Avatar from "../components/Avatar";
import { useApp } from "../context/AppContext";
import AddDocumentModal from "../components/AddDocumentModal";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, advocates, docsFor, deleteDocument } = useApp();
  const [showDoc, setShowDoc] = useState(false);
  const client = clients.find((c) => c.id === id);
  const docs = docsFor("client", id);

  if (!client) return <p className="text-slate-400 text-sm">Client not found.</p>;

  const assignedAdvocate = advocates.find((a) => a.id === client.advocateId);

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/app/clients")} className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition">
        <ChevronRight size={14} className="rotate-180" /> Back to Clients
      </button>

      <GlassCard accent="#10B981">
        <div className="p-6 flex flex-wrap items-center gap-5">
          <Avatar name={client.name} size={64} />
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-800">{client.name}</h2>
              <BadgeCheck size={18} className="text-emerald" />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5"><Phone size={12} /> {client.mobile}</span>
              <span className="flex items-center gap-1.5"><Mail size={12} /> {client.email}</span>
              <span className="flex items-center gap-1.5"><MapPin size={12} /> {client.address}</span>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald/10 text-emerald">{client.idNumber}</span>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <InfoCard icon={MapPin} label="Address" value={client.address || "—"} accent="#06B6D4" />
        <InfoCard icon={BadgeCheck} label="Aadhaar / PAN" value={client.idNumber || "—"} accent="#FBBF24" />
        <InfoCard icon={Building2} label="Assigned Advocate" value={assignedAdvocate?.name || "Unassigned"} accent="#EC4899" />
      </div>

      <GlassCard accent="#F97316">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><FolderOpen size={18} className="text-orange" /> Documents ({docs.length})</h3>
            <PrimaryButton accent="#F97316" onClick={() => setShowDoc(true)}><Upload size={15} /> Upload Document</PrimaryButton>
          </div>
          {docs.length === 0 ? (
            <p className="text-sm text-slate-400 italic py-6 text-center">No documents linked to {client.name} yet.</p>
          ) : (
            <div className="space-y-2">
              {docs.map((d) => (
                <div key={d.id} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/70 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center"><FileText size={15} className="text-orange" /></div>
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{d.title}</div>
                      <div className="text-[11px] text-slate-400">{d.category} · {d.uploadedOn}</div>
                    </div>
                  </div>
                  <button onClick={() => deleteDocument(d.id)} className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-danger p-1.5">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </GlassCard>

      {showDoc && <AddDocumentModal onClose={() => setShowDoc(false)} presetOwner={{ type: "client", id }} />}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, accent }) {
  return (
    <GlassCard accent={accent}>
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}15` }}>
          <Icon size={17} style={{ color: accent }} />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{label}</div>
          <div className="text-sm font-bold text-slate-700 truncate">{value}</div>
        </div>
      </div>
    </GlassCard>
  );
}
