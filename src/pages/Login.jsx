import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Scale, Users, Folder, ChevronRight, CheckSquare, Shield, Cloud, RefreshCw } from "lucide-react";
import { useApp } from "../context/AppContext";

/**
 * DEV-ONLY REFERENCE — DEMO CREDENTIALS
 *
 *   Super Admin  -> superadmin@legaldesk.in / password123
 *   Admin        -> admin@legaldesk.in      / password123
 *   Sub Admin    -> subadmin@legaldesk.in   / password123
 *   Advocate     -> advocate@legaldesk.in   / password123
 *   Staff/Bearer -> staff@legaldesk.in      / password123
 */

export default function Login() {
  const { user, login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/app/dashboard" replace />;

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    try {
      login({ email, password });
      navigate("/app/dashboard");
    } catch (err) {
      setError(err.message || "Failed to log in.");
    }
  };

  return (
    <div className="min-h-screen w-full select-none">

      {/* Full-viewport container — no padding, no border, no rounding */}
      <div
        className="w-full min-h-screen relative overflow-hidden flex flex-col bg-white"
      >

        {/* Full background photo — this asset is clean across its entire canvas
            (pillar/scales/books on the left, decorative gold-line pattern on the
            right), so it can be used as a straightforward full-cover background. */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "url('/login.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Soft white wash so the dark headline/body text stays legible over the photo */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0) 100%)" }}
        />

        {/* Main content area */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-10 lg:px-20 pt-10 pb-28 z-10 w-full gap-8 lg:gap-6 min-h-screen">

          {/* Left Column: Brand, Headline, Feature cards */}
          <div className="w-full lg:w-[62%] flex flex-col justify-center h-full space-y-3">

            {/* Logo Brand Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0f2d1e] flex items-center justify-center shadow-md">
                <Scale className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="font-serif font-extrabold text-xl text-[#0f2d1e] leading-none" style={{ fontFamily: "Georgia, serif" }}>
                  Legal Desk
                </h2>
                <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase mt-1">
                  Case Management System
                </p>
              </div>
            </div>

            {/* Headline and feature cards aligned in a single row */}
            <div className="flex flex-row items-start gap-8 pb-4">
              
              {/* Heading and gold divider */}
              <div className="max-w-[280px] space-y-3">
                <h1 className="text-2xl lg:text-[34px] font-extrabold leading-tight text-slate-800 font-serif" style={{ fontFamily: "Georgia, serif" }}>
                  <span className="text-[#c59a3f]">Smart</span> Case Management.<br />
                  <span className="text-[#c59a3f]">Stronger</span> Legal Outcomes.
                </h1>
                
                <div className="w-10 h-[2px] bg-[#c59a3f] opacity-80" />
                
                <p className="text-slate-600 text-[10px] font-semibold leading-relaxed">
                  Streamline your legal workflow, manage cases, clients, and documents all in one secure platform.
                </p>
              </div>

              {/* Solid Real React Feature Cards placed cleanly over background graphics */}
              <div className="w-full max-w-[260px] space-y-3 shrink-0 pt-8">

                <div className="flex flex-row items-center justify-between px-5 py-4 rounded-2xl bg-white/95 shadow-md border border-slate-100 hover:shadow-lg transition cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-[#0f2d1e]" />
                    <span className="font-semibold text-slate-800 text-[15px] whitespace-nowrap">Manage Clients</span>
                  </div>
                  <ChevronRight size={18} className="text-[#c59a3f] group-hover:translate-x-0.5 transition shrink-0" />
                </div>

                <div className="flex flex-row items-center justify-between px-5 py-4 rounded-2xl bg-white/95 shadow-md border border-slate-100 hover:shadow-lg transition cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-[#0f2d1e]" />
                    <span className="font-semibold text-slate-800 text-[15px] whitespace-nowrap">Manage Cases</span>
                  </div>
                  <ChevronRight size={18} className="text-[#c59a3f] group-hover:translate-x-0.5 transition shrink-0" />
                </div>

                <div className="flex flex-row items-center justify-between px-5 py-4 rounded-2xl bg-white/95 shadow-md border border-slate-100 hover:shadow-lg transition cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <CheckSquare size={18} className="text-[#0f2d1e]" />
                    <span className="font-semibold text-slate-800 text-[15px] whitespace-nowrap">Manage Documents</span>
                  </div>
                  <ChevronRight size={18} className="text-[#c59a3f] group-hover:translate-x-0.5 transition shrink-0" />
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="w-full lg:w-[34%] flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[420px] rounded-[1.5rem] bg-white shadow-2xl border border-slate-100 p-9 flex flex-col justify-center">

              <div className="flex flex-col items-center text-center mb-7">
                <div className="w-14 h-14 rounded-full border border-[#c59a3f]/40 bg-[#0f2d1e]/5 flex items-center justify-center mb-3">
                  <Lock className="w-5 h-5 text-[#0f2d1e]" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-serif" style={{ fontFamily: "Georgia, serif" }}>
                  Welcome back
                </h1>
                <p className="text-xs text-slate-400 font-medium mt-1">Sign in to access your dashboard</p>
                <div className="w-12 h-[2px] bg-[#c59a3f] mt-3.5 opacity-80" />
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <span className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Email</span>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-3 text-sm text-slate-800 outline-none transition focus:border-[#0f2d1e] focus:ring-1 focus:ring-[#0f2d1e]"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Password</span>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm text-slate-800 outline-none transition focus:border-[#0f2d1e] focus:ring-1 focus:ring-[#0f2d1e]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="w-full rounded-xl px-4 py-3.5 text-[13px] font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 bg-[#0f2d1e]"
                  style={{ boxShadow: "0 8px 20px -6px #0f2d1e99" }}
                >
                  <Scale className="w-4 h-4 text-white" strokeWidth={2} />
                  Sign In
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* Bottom feature bar — inset on the right, not full width, so the photo
            stays visible bare in the bottom-left corner as in the reference */}
        <div className="absolute bottom-6 right-6 lg:right-8 w-[60%] max-w-[820px] bg-[#0f2d1e] rounded-2xl py-6 px-8 flex items-center justify-between z-20 shadow-lg">

          <div className="flex flex-col items-center justify-center text-center flex-1 gap-1.5">
            <Shield size={20} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[11px] font-semibold tracking-wide text-white/90">Secure</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center flex-1 gap-1.5">
            <Cloud size={20} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[11px] font-semibold tracking-wide text-white/90">Cloud Based</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center flex-1 gap-1.5">
            <RefreshCw size={19} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[11px] font-semibold tracking-wide text-white/90">Reliable</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center flex-1 gap-1.5">
            <Users size={20} className="text-white/90" strokeWidth={1.75} />
            <span className="text-[11px] font-semibold tracking-wide text-white/90">User Friendly</span>
          </div>

        </div>

      </div>

    </div>
  );
}