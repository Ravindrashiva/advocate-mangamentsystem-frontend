import React from "react";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bgsoft text-center px-6">
      <Scale size={40} className="text-primary mb-4" />
      <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Page not found</h1>
      <p className="text-sm text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/app/dashboard" className="text-sm font-bold text-white px-5 py-2.5 rounded-xl" style={{ background: "linear-gradient(135deg, #1E3A8A, #2563EB)" }}>
        Back to Dashboard
      </Link>
    </div>
  );
}
