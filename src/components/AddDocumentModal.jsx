import React, { useState } from "react";
import { FileText, Upload } from "lucide-react";
import Modal from "./Modal";
import Field, { inputCls } from "./Field";
import PrimaryButton from "./PrimaryButton";
import { useApp } from "../context/AppContext";
import { DOC_CATEGORIES } from "../data/mockData";

export default function AddDocumentModal({ onClose, presetOwner }) {
  const { addDocument, advocates, clients } = useApp();
  const [form, setForm] = useState({
    title: "",
    category: DOC_CATEGORIES[0],
    ownerType: presetOwner?.type || "client",
    ownerId: presetOwner?.id || "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const list = form.ownerType === "advocate" ? advocates : clients;
  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.ownerId) return;
    addDocument(form);
    onClose();
  };
  return (
    <Modal title="Upload Document" icon={FileText} accent="#F97316" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Document Title" required><input className={inputCls} value={form.title} onChange={set("title")} placeholder="e.g. Affidavit - Civil Suit 44/2026" required /></Field>
        <Field label="Category">
          <select className={inputCls} value={form.category} onChange={set("category")}>
            {DOC_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Link To" required>
            <select className={inputCls} value={form.ownerType} onChange={(e) => setForm((f) => ({ ...f, ownerType: e.target.value, ownerId: "" }))} disabled={!!presetOwner}>
              <option value="client">Client</option>
              <option value="advocate">Advocate</option>
            </select>
          </Field>
          <Field label={form.ownerType === "advocate" ? "Advocate" : "Client"} required>
            <select className={inputCls} value={form.ownerId} onChange={set("ownerId")} required disabled={!!presetOwner}>
              <option value="">Select...</option>
              {list.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </Field>
        </div>
        <div className="mb-4 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-slate-400 text-xs font-medium bg-slate-50/60">
          <Upload size={22} className="mx-auto mb-2 text-slate-300" />
          Drag & drop file here (PDF, DOC, JPG, PNG) — demo only
        </div>
        <PrimaryButton type="submit" accent="#F97316" full><Upload size={16} /> Upload & Link</PrimaryButton>
      </form>
    </Modal>
  );
}
