import React, { useState } from "react";
import { Users, Plus } from "lucide-react";
import Modal from "./Modal";
import Field, { inputCls } from "./Field";
import PrimaryButton from "./PrimaryButton";
import { useApp } from "../context/AppContext";

export default function AddClientModal({ onClose }) {
  const { addClient, advocates } = useApp();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", address: "", idNumber: "", advocateId: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;
    addClient(form);
    onClose();
  };
  return (
    <Modal title="Add New Client" icon={Users} accent="#10B981" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Full Name" required><input className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. Lakshmi Devi" required /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Mobile" required><input className={inputCls} value={form.mobile} onChange={set("mobile")} placeholder="9876543210" required /></Field>
          <Field label="Email"><input className={inputCls} value={form.email} onChange={set("email")} placeholder="name@email.com" type="email" /></Field>
        </div>
        <Field label="Address"><input className={inputCls} value={form.address} onChange={set("address")} placeholder="City, District" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Aadhaar / PAN"><input className={inputCls} value={form.idNumber} onChange={set("idNumber")} placeholder="ABCDE1234F" /></Field>
          <Field label="Assign Advocate">
            <select className={inputCls} value={form.advocateId} onChange={set("advocateId")}>
              <option value="">Unassigned</option>
              {advocates.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </Field>
        </div>
        <PrimaryButton type="submit" accent="#10B981" full><Plus size={16} /> Add Client</PrimaryButton>
      </form>
    </Modal>
  );
}
