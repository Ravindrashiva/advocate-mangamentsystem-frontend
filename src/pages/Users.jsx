import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserCheck, Mail, Shield, Plus, Key } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

const initialUsersList = [
  { id: 1, name: "Varun Verma", email: "superadmin@legaldesk.in", role: "superadmin", lastActive: "Just Now" },
  { id: 2, name: "Admin User", email: "admin@legaldesk.in", role: "admin", lastActive: "10 mins ago" },
  { id: 3, name: "Ramesh Varma", email: "ramesh.varma@legaldesk.in", role: "advocate", lastActive: "2 hours ago" },
  { id: 4, name: "SubAdmin User", email: "subadmin@legaldesk.in", role: "subadmin", lastActive: "1 day ago" },
  { id: 5, name: "Staff Clerk", email: "staff@legaldesk.in", role: "staff", lastActive: "3 days ago" }
];

export default function Users() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "superadmin";

  const [usersList, setUsersList] = useState(initialUsersList);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const filteredUsers = usersList.filter((u) => u.role === role);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      lastActive: "Never"
    };
    setUsersList([...usersList, newUser]);
    setName("");
    setEmail("");
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <UserCheck size={20} className="text-indigo-900" />
          <h2 className="text-lg font-extrabold text-slate-800 capitalize">
            {role === "superadmin" && "Super Administrators"}
            {role === "admin" && "System Administrators"}
            {role === "subadmin" && "Sub Administrators"}
            {role === "advocate" && "Advocate Accounts"}
            {role === "staff" && "Support Staff / Clerks"}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white bg-slate-800">{filteredUsers.length}</span>
        </div>
        <PrimaryButton accent="#312E81" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> New User
        </PrimaryButton>
      </div>

      {showAdd && (
        <GlassCard accent="#312E81">
          <form onSubmit={handleAddUser} className="p-5 space-y-4">
            <h3 className="font-bold text-slate-700 text-sm">Create New Access Account</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sen"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-indigo-900 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@legaldesk.in"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-indigo-900 bg-white"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <PrimaryButton accent="#312E81" type="submit">Create Account</PrimaryButton>
            </div>
          </form>
        </GlassCard>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredUsers.map((u) => (
          <GlassCard key={u.id} accent="#312E81">
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5"><Shield size={14} className="text-indigo-800" /> {u.name}</h4>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1"><Mail size={12} /> {u.email}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Last Active</div>
                <div className="text-xs text-slate-700 font-bold">{u.lastActive}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
