import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import GlassCard from "./GlassCard";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useApp();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6">
        <GlassCard accent="#EF4444" className="max-w-md w-full">
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 mb-6 animate-pulse">
              <ShieldAlert size={36} />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-3">Access Denied</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Your role <span className="font-bold text-slate-700 capitalize">{(user.role || "").replace("_", " ")}</span> does not have permissions to access this module.
            </p>
            <button
              onClick={() => navigate("/app/dashboard")}
              className="flex items-center justify-center gap-2 w-full py-3 px-5 text-sm font-bold text-white rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition bg-[#1E3A8A]"
              style={{ boxShadow: "0 8px 20px -6px #1E3A8A99" }}
            >
              <ArrowLeft size={16} />
              Return to Dashboard
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return children;
}
