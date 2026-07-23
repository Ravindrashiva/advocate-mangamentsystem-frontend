import React, { useState } from "react";
import { NotebookPen, Plus } from "lucide-react";
import Modal from "./Modal";
import Field, { inputCls } from "./Field";
import PrimaryButton from "./PrimaryButton";
import { useApp } from "../context/AppContext";

export default function AddCaseModal({ onClose }) {
  const { addCase, advocates, clients } = useApp();
  const [form, setForm] = useState({ caseNo: "", title: "", status: "Active", court: "", nextHearing: "", advocateId: "", clientId: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.caseNo || !form.title) return;
    addCase(form);
    onClose();
  };
  return (
    <Modal title="Create New Case" icon={NotebookPen} accent="#06B6D4" onClose={onClose}>
      <form onSubmit={submit}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Case Number" required><input className={inputCls} value={form.caseNo} onChange={set("caseNo")} placeholder="CV-2301" required /></Field>
          <Field label="Status">
            <select className={inputCls} value={form.status} onChange={set("status")}>
              <option>Active</option><option>Pending Approval</option><option>Closed</option>
            </select>
          </Field>
        </div>
        <Field label="Case Title" required><input className={inputCls} value={form.title} onChange={set("title")} placeholder="e.g. Property Dispute — X vs Y" required /></Field>
        <Field label="Court"><input className={inputCls} value={form.court} onChange={set("court")} placeholder="District Court, ..." /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Next Hearing"><input type="date" className={inputCls} value={form.nextHearing} onChange={set("nextHearing")} /></Field>
          <Field label="Advocate">
            <select className={inputCls} value={form.advocateId} onChange={set("advocateId")}>
              <option value="">Select...</option>
              {advocates.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Client">
          <select className={inputCls} value={form.clientId} onChange={set("clientId")}>
            <option value="">Select...</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <PrimaryButton type="submit" accent="#06B6D4" full><Plus size={16} /> Create Case</PrimaryButton>
      </form>
    </Modal>
  );
}
