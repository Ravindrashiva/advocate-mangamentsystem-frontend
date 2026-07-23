import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { useApp } from "../context/AppContext";

export default function Topbar({ search, setSearch }) {
  const { pathname } = useLocation();
  const { user } = useApp();
  const title = pathname.split("/").filter(Boolean).pop()?.replace("-", " ") || "dashboard";

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 border-b border-slate-200/70 px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800 capitalize tracking-tight">{title}</h1>
        <p className="text-xs text-slate-500 font-medium">Manage your legal practice, elegantly.</p>
      </div>
      <div className="flex items-center gap-3">
        {setSearch && (
          <div className="relative hidden md:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search advocates, clients..."
              className="pl-9 pr-4 py-2.5 rounded-xl bg-slate-100/80 border border-transparent focus:border-secondary focus:bg-white outline-none text-sm w-64 transition"
            />
          </div>
        )}
        <button className="w-10 h-10 rounded-xl bg-slate-100/80 flex items-center justify-center relative hover:bg-slate-200/70 transition">
          <Bell size={17} className="text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger" />
        </button>
        <Avatar name={user?.name || "Super Admin"} size={40} />
      </div>
    </header>
  );
}
