import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Users, Plus, ChevronRight, Phone, FileText } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import EmptyState from "../components/EmptyState";
import Avatar from "../components/Avatar";
import { useApp } from "../context/AppContext";
import AddClientModal from "../components/AddClientModal";

export default function Clients() {
  const { clients, docsFor } = useApp();
  const { search = "" } = useOutletContext() || {};
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action");

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (action === "add") {
      setShowAdd(true);
    }
  }, [action]);

  const handleCloseModal = () => {
    setShowAdd(false);
    if (action === "add") {
      const params = new URLSearchParams(searchParams);
      params.delete("action");
      setSearchParams(params);
    }
  };

  const filtered = useMemo(
    () => clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [clients, search]
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <Users size={20} className="text-emerald" />
          <h2 className="text-lg font-extrabold text-slate-800">Clients</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-emerald">{filtered.length}</span>
        </div>
        <PrimaryButton accent="#10B981" onClick={() => setShowAdd(true)}><Plus size={16} /> Add Client</PrimaryButton>
      </div>

      {filtered.length === 0 ? (
        <EmptyState accent="#10B981" icon={Users} label="No clients yet" onAdd={() => setShowAdd(true)} cta="Add Client" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <GlassCard key={c.id} accent="#10B981">
              <button onClick={() => navigate(`/app/clients/${c.id}`)} className="w-full text-left p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <Avatar name={c.name} />
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition mt-3" />
                </div>
                <div className="font-bold text-slate-800 text-[15px]">{c.name}</div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Phone size={11} />{c.mobile}</div>
                <div className="text-xs font-semibold mt-2 text-emerald">{c.address}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">{c.idNumber}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 bg-emerald/10 text-emerald">
                    <FileText size={10} /> {docsFor("client", c.id).length} docs
                  </span>
                </div>
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      {showAdd && <AddClientModal onClose={handleCloseModal} />}
    </div>
  );
}
