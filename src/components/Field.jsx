import React from "react";

export const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10";

export default function Field({ label, children, required }) {
  return (
    <label className="block mb-3.5">
      <span className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
        {label} {required && <span className="text-danger">*</span>}
      </span>
      {children}
    </label>
  );
}
