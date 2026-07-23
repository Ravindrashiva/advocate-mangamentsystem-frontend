import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Settings, Save, ShieldAlert, Database, DollarSign, Scale, Globe } from "lucide-react";
import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

export default function SettingsPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "profile";

  // State Profile
  const [firmName, setFirmName] = useState("Varna & Associates Advocates");
  const [address, setAddress] = useState("Vijayawada, Andhra Pradesh, India");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <Settings size={20} className="text-slate-600" />
        <h2 className="text-lg font-extrabold text-slate-800 capitalize">
          {tab === "profile" && "Company Profile Settings"}
          {tab === "membership" && "Membership Subscription Plans"}
          {tab === "permissions" && "Roles & Access Control Policies"}
          {tab === "courts" && "Court Master Registration"}
          {tab === "states" && "State Master Configuration"}
          {tab === "fee" && "Service Fee Class Structure"}
          {tab === "backup" && "Database Backup & Restore center"}
        </h2>
      </div>

      {tab === "profile" && (
        <GlassCard accent="#6B7280">
          <form className="p-5 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Profile updated successfully"); }}>
            <h3 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Globe size={15} /> Edit General Firm Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Law Firm Name</label>
                <input
                  type="text"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Corporate Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white outline-none"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <PrimaryButton accent="#6B7280" type="submit">
                <Save size={15} /> Save Changes
              </PrimaryButton>
            </div>
          </form>
        </GlassCard>
      )}

      {tab === "membership" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GlassCard accent="#6B7280">
            <div className="p-5 space-y-3">
              <h4 className="font-extrabold text-slate-800 text-sm">Professional Solo Tier</h4>
              <div className="text-2xl font-black text-slate-700">₹999 <span className="text-xs font-bold text-slate-400">/ Month</span></div>
              <ul className="text-xs text-slate-500 font-semibold space-y-1 list-disc pl-5">
                <li>1 Administrator account</li>
                <li>Up to 100 cases tracking</li>
                <li>Basic documents storage</li>
              </ul>
            </div>
          </GlassCard>
          <GlassCard accent="#6B7280">
            <div className="p-5 space-y-3 border-2 border-[#6B7280]/20">
              <div className="flex justify-between items-center"><h4 className="font-extrabold text-slate-800 text-sm">Enterprise Firm Tier</h4><span className="text-[10px] font-extrabold text-white bg-slate-600 px-2 py-0.5 rounded">ACTIVE</span></div>
              <div className="text-2xl font-black text-slate-700">₹4,999 <span className="text-xs font-bold text-slate-400">/ Month</span></div>
              <ul className="text-xs text-slate-500 font-semibold space-y-1 list-disc pl-5">
                <li>Unlimited advocates & clerks</li>
                <li>Unlimited client record intake</li>
                <li>Full backup & legal template builders</li>
              </ul>
            </div>
          </GlassCard>
        </div>
      )}

      {tab === "permissions" && (
        <GlassCard accent="#6B7280">
          <div className="p-5 space-y-3">
            <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><ShieldAlert size={16} /> Role Access Policies</h4>
            <p className="text-xs text-slate-500 font-medium">Configure explicit module access policies. Permissions determine navigation items visible for registered workspace actors.</p>
            <div className="text-xs font-semibold text-slate-600 space-y-2 pt-2">
              <div><strong className="text-slate-800">Super Admin / Admin:</strong> Full permissions across settings, reports, finance logs.</div>
              <div><strong className="text-slate-800">Sub Admin:</strong> Restricted finance and system configurations visibility.</div>
              <div><strong className="text-slate-800">Advocate:</strong> Read-write on cases, client rosters. Restricted from daybooks and system setups.</div>
              <div><strong className="text-slate-800">Staff/Bearer:</strong> Purely case records operations and document attachment logs.</div>
            </div>
          </div>
        </GlassCard>
      )}

      {tab === "courts" && (
        <GlassCard accent="#6B7280">
          <div className="p-5 space-y-3">
            <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Scale size={16} /> Registered Jurisdictions</h4>
            <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              <div className="py-2.5">High Court of Andhra Pradesh (Amaravati)</div>
              <div className="py-2.5">District & Sessions Court (Vijayawada)</div>
              <div className="py-2.5">Metropolitan Magistrate Court (Vijayawada)</div>
            </div>
          </div>
        </GlassCard>
      )}

      {tab === "states" && (
        <GlassCard accent="#6B7280">
          <div className="p-5 space-y-3">
            <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Globe size={16} /> States Registry</h4>
            <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              <div className="py-2.5">Andhra Pradesh (Active)</div>
              <div className="py-2.5">Telangana (Active)</div>
              <div className="py-2.5">Tamil Nadu (Active)</div>
            </div>
          </div>
        </GlassCard>
      )}

      {tab === "fee" && (
        <GlassCard accent="#6B7280">
          <div className="p-5 space-y-3">
            <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><DollarSign size={16} /> Base Billable Fees Configuration</h4>
            <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              <div className="flex justify-between py-2"><span>Drafting Petition</span><span>₹5,000</span></div>
              <div className="flex justify-between py-2"><span>Hearing Attendance</span><span>₹1,500</span></div>
              <div className="flex justify-between py-2"><span>Legal Retainer (Monthly)</span><span>₹25,000</span></div>
            </div>
          </div>
        </GlassCard>
      )}

      {tab === "backup" && (
        <GlassCard accent="#6B7280">
          <div className="p-5 space-y-4">
            <h4 className="font-bold text-slate-700 text-sm flex items-center gap-1.5"><Database size={16} /> Database Backup Actions</h4>
            <p className="text-xs text-slate-500 font-medium">Safely export or restore the complete application workspace data including advocate logs, hearing details, and client details.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton accent="#6B7280" onClick={() => alert("Creating secure data dump...")}>Backup Database Now</PrimaryButton>
              <button className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition" onClick={() => alert("Ready to restore database. Select dump file.")}>Restore from File</button>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
