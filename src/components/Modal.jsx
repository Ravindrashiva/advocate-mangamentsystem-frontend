import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, icon: Icon, accent, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div
          className="px-6 py-5 flex items-center justify-between shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon size={20} className="text-white" />
            </div>
            <h3 className="text-white font-bold text-lg">{title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center text-white transition">
            <X size={18} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
