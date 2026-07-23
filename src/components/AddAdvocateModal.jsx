import React, { useState } from "react";
import { Gavel, Plus } from "lucide-react";
import Modal from "./Modal";
import Field, { inputCls } from "./Field";
import PrimaryButton from "./PrimaryButton";
import { useApp } from "../context/AppContext";

export default function AddAdvocateModal({ onClose }) {
  const { addAdvocate } = useApp();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", enrolment: "", specialization: "", experience: "", relation: "Junior Advocate" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile) return;
    addAdvocate(form);
    onClose();
  };
  return (
    <Modal title="Add New Advocate" icon={Gavel} accent="#7C3AED" onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="Full Name" required><input className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. Anjali Rao" required /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Mobile" required><input className={inputCls} value={form.mobile} onChange={set("mobile")} placeholder="9876543210" required /></Field>
          <Field label="Email"><input className={inputCls} value={form.email} onChange={set("email")} placeholder="name@email.com" type="email" /></Field>
        </div>
        <Field label="Enrolment Number"><input className={inputCls} value={form.enrolment} onChange={set("enrolment")} placeholder="AP/1234/2024" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Specialization"><input className={inputCls} value={form.specialization} onChange={set("specialization")} placeholder="Civil / Criminal / Property" /></Field>
          <Field label="Experience"><input className={inputCls} value={form.experience} onChange={set("experience")} placeholder="e.g. 6 yrs" /></Field>
        </div>
        <Field label="Advocate Relation">
          <select className={inputCls} value={form.relation} onChange={set("relation")}>
            <option>Senior Advocate</option><option>Junior Advocate</option><option>Referral Advocate</option>
          </select>
        </Field>
        <PrimaryButton type="submit" accent="#7C3AED" full><Plus size={16} /> Add Advocate</PrimaryButton>
      </form>
    </Modal>
  );
}
