import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div
      key={toast.key}
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white font-semibold shadow-2xl"
      style={{ background: `linear-gradient(135deg, ${toast.accent}, ${toast.accent}CC)`, animation: "fadeIn 0.3s" }}
    >
      <CheckCircle2 size={20} />
      {toast.msg}
    </div>
  );
}
