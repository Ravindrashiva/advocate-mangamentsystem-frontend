import React, { useState } from "react";
import { MapPin, Navigation, Compass, Calendar, Plus } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

const INITIAL_VISITS = [
  { id: 1, partyName: "Suresh Kumar", address: "Vijayawada Sub-Court Area", date: "2026-07-20", status: "Completed", coordinates: "16.5062° N, 80.6480° E" },
  { id: 2, partyName: "Ranjit Builders Site", address: "Guntur Road Bypass Property", date: "2026-07-23", status: "Pending", coordinates: "16.3067° N, 80.4365° E" }
];

export default function Location() {
  const [visits, setVisits] = useState(INITIAL_VISITS);
  const [showAdd, setShowAdd] = useState(false);
  const [partyName, setPartyName] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!partyName || !address) return;
    const newVisit = {
      id: Date.now(),
      partyName,
      address,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      coordinates: coords || "16.5085° N, 80.6425° E"
    };
    setVisits([newVisit, ...visits]);
    setPartyName("");
    setAddress("");
    setCoords("");
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MapPin size={20} className="text-emerald-500" />
          <h2 className="text-lg font-extrabold text-slate-800">Field Visit / Party Location Entry</h2>
        </div>
        <PrimaryButton accent="#10B981" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Record Visit
        </PrimaryButton>
      </div>

      {showAdd && (
        <GlassCard accent="#10B981">
          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <h3 className="font-bold text-slate-800 text-sm">New Location / Field Visit Entry</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Party / Client Name</label>
                <input type="text" value={partyName} onChange={(e) => setPartyName(e.target.value)} placeholder="e.g. Suresh Kumar" className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Address / Site Visited</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. Sub-Court Site" className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">GPS Coordinates (Optional)</label>
                <input type="text" value={coords} onChange={(e) => setCoords(e.target.value)} placeholder="e.g. 16.5062° N, 80.6480° E" className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <PrimaryButton accent="#10B981" type="submit">Submit Entry</PrimaryButton>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visits.map((v) => (
          <GlassCard key={v.id} accent={v.status === "Completed" ? "#10B981" : "#F97316"}>
            <div className="p-5 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    v.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-orange/10 text-orange"
                  }`}>
                    {v.status}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm">{v.partyName}</h4>
                </div>
                <p className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                  <Compass size={12} className="text-slate-400" />
                  <span>{v.address}</span>
                </p>
                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Navigation size={10} className="text-slate-300" />
                  <span>GPS: {v.coordinates}</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 font-bold flex items-center gap-1 shrink-0">
                <Calendar size={12} /> {v.date}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
