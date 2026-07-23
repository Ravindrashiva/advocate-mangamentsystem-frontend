import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bell, Send, MessageSquare, Mail, AlertTriangle } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

const initialLogs = [
  { id: 1, type: "SMS", recipient: "Suresh Kumar", content: "Reminder: Hearing tomorrow at 10:30 AM in District Court.", date: "2026-07-16 09:30" },
  { id: 2, type: "Email", recipient: "ramesh.varma@legaldesk.in", content: "Hearing calendar for the week attached.", date: "2026-07-16 10:00" },
  { id: 3, type: "WhatsApp", recipient: "Priya Nair", content: "Case assignment: CV-2291. Please prepare notes.", date: "2026-07-16 11:15" },
  { id: 4, type: "Alerts", recipient: "All Advocates", content: "System will undergo maintenance on Sunday.", date: "2026-07-15 18:00" }
];

export default function Notifications() {
  const [searchParams] = useSearchParams();
  const channel = searchParams.get("channel") || "sms";

  const [logs, setLogs] = useState(initialLogs);
  const [recipient, setRecipient] = useState("");
  const [contentMsg, setContentMsg] = useState("");

  const filteredLogs = logs.filter((l) => l.type.toLowerCase() === channel.toLowerCase());

  const handleSend = (e) => {
    e.preventDefault();
    if (!recipient || !contentMsg) return;
    const newLog = {
      id: Date.now(),
      type: channel === "sms" ? "SMS" : channel === "email" ? "Email" : channel === "whatsapp" ? "WhatsApp" : "Alerts",
      recipient,
      content: contentMsg,
      date: new Date().toISOString().replace("T", " ").substring(0, 16)
    };
    setLogs([newLog, ...logs]);
    setRecipient("");
    setContentMsg("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <Bell size={20} className="text-emerald-500" />
        <h2 className="text-lg font-extrabold text-slate-800 capitalize">{channel} Notification Dispatcher</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compose Card */}
        <div className="lg:col-span-1">
          <GlassCard accent="#10B981">
            <form onSubmit={handleSend} className="p-5 space-y-4">
              <h3 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Send size={15} /> Compose Dispatch</h3>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Recipient Name/Contact</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Suresh Kumar"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-emerald-500 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message Body</label>
                <textarea
                  value={contentMsg}
                  onChange={(e) => setContentMsg(e.target.value)}
                  placeholder="Write message content..."
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-emerald-500 bg-white"
                  required
                />
              </div>
              <PrimaryButton accent="#10B981" type="submit" className="w-full justify-center">
                Send Notification
              </PrimaryButton>
            </form>
          </GlassCard>
        </div>

        {/* Dispatch Log */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-700 text-sm">Outgoing Dispatch Log</h3>
          <div className="space-y-3">
            {filteredLogs.map((l) => (
              <GlassCard key={l.id} accent="#10B981">
                <div className="p-4 flex justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">{l.type}</span>
                      <span className="text-xs font-bold text-slate-800">{l.recipient}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{l.content}</p>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold shrink-0">{l.date}</div>
                </div>
              </GlassCard>
            ))}
            {filteredLogs.length === 0 && (
              <div className="text-center py-10 text-slate-400 font-medium">No previous dispatches for this channel.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
