import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Gavel, Plus, ChevronRight, Phone, FileText, Bookmark } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";
import EmptyState from "../components/EmptyState";
import Avatar from "../components/Avatar";
import { useApp } from "../context/AppContext";
import AddAdvocateModal from "../components/AddAdvocateModal";

export default function Advocates() {
  const { advocates, docsFor, cases } = useApp();
  const { search = "" } = useOutletContext() || {};
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const action = searchParams.get("action");
  const filter = searchParams.get("filter");
  const tab = searchParams.get("tab");

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

  const filtered = useMemo(() => {
    let list = advocates.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()));
    if (filter === "senior") {
      list = list.filter((a) => a.relation === "Senior Advocate");
    } else if (filter === "junior") {
      list = list.filter((a) => a.relation === "Junior Advocate");
    }
    return list;
  }, [advocates, search, filter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <Gavel size={20} className="text-purple" />
          <h2 className="text-lg font-extrabold text-slate-800">
            {filter === "senior" && "Senior Advocates"}
            {filter === "junior" && "Junior Advocates"}
            {tab === "assignments" && "Advocate Assignments"}
            {!filter && !tab && "Advocates"}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-purple">
            {filtered.length}
          </span>
        </div>
        <PrimaryButton accent="#7C3AED" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Add Advocate
        </PrimaryButton>
      </div>

      {filtered.length === 0 ? (
        <EmptyState accent="#7C3AED" icon={Gavel} label="No advocates matches found" onAdd={() => setShowAdd(true)} cta="Add Advocate" />
      ) : tab === "assignments" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((a) => {
            const assignedCases = cases.filter((c) => c.advocateId === a.id);
            return (
              <GlassCard key={a.id} accent="#7C3AED">
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={a.name} />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{a.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{a.relation}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Bookmark size={11} /> Cases Assigned ({assignedCases.length}):</span>
                    {assignedCases.length === 0 ? (
                      <div className="text-xs text-slate-400 italic">No current assignments.</div>
                    ) : (
                      <div className="space-y-1.5 pl-2">
                        {assignedCases.map((c) => (
                          <div key={c.id} className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                            <span className="text-[9px] bg-purple/10 text-purple px-1.5 py-0.5 rounded">{c.caseNo}</span>
                            <span className="truncate">{c.title}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <GlassCard key={a.id} accent="#7C3AED">
              <button onClick={() => navigate(`/app/advocates/${a.id}`)} className="w-full text-left p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <Avatar name={a.name} />
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition mt-3" />
                </div>
                <div className="font-bold text-slate-800 text-[15px]">{a.name}</div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><Phone size={11} />{a.mobile}</div>
                <div className="text-xs font-semibold mt-2 text-purple">{a.specialization}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400">{a.experience} · {a.relation}</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 bg-purple/10 text-purple">
                    <FileText size={10} /> {docsFor("advocate", a.id).length} docs
                  </span>
                </div>
              </button>
            </GlassCard>
          ))}
        </div>
      )}

      {showAdd && <AddAdvocateModal onClose={handleCloseModal} />}
    </div>
  );
}
