import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Calculator, Percent, ShieldCheck, Scale, Ruler } from "lucide-react";
import GlassCard from "../components/GlassCard";

export default function Tools() {
  const [searchParams] = useSearchParams();
  const tool = searchParams.get("tool") || "fee";

  // Fee State
  const [hearings, setHearings] = useState(5);
  const [baseFee, setBaseFee] = useState(10000);
  const [totalFee, setTotalFee] = useState(15000);

  // Percent State
  const [amount, setAmount] = useState(50000);
  const [percentVal, setPercentVal] = useState(10);
  const [calculatedPercent, setCalculatedPercent] = useState(5000);

  // Stamp Duty State
  const [propertyVal, setPropertyVal] = useState(2500000);
  const [stampDutyRate, setStampDutyRate] = useState(6);
  const [stampDutyFee, setStampDutyFee] = useState(150000);

  const calculateFee = (h, b) => {
    const rate = Number(h) * 1000 + Number(b);
    setTotalFee(rate);
  };

  const calculatePercentVal = (a, p) => {
    setCalculatedPercent((Number(a) * Number(p)) / 100);
  };

  const calculateStampDuty = (val, rate) => {
    setStampDutyFee((Number(val) * Number(rate)) / 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5">
        <Calculator size={20} className="text-cyan-500" />
        <h2 className="text-lg font-extrabold text-slate-800">
          {tool === "fee" && "Legal Fee Estimator"}
          {tool === "percent" && "Contingency Fee & Percentage Calculator"}
          {tool === "stamp" && "Stamp Duty Calculator"}
          {tool === "area" && "Property Area Calculator"}
          {tool === "converter" && "Legal Unit Converter"}
        </h2>
      </div>

      {tool === "fee" && (
        <GlassCard accent="#06B6D4">
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-slate-700 text-sm">Estimate Advocate Fees</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Base Drafting/Retainer Fee (₹)</label>
                <input
                  type="number"
                  value={baseFee}
                  onChange={(e) => { setBaseFee(e.target.value); calculateFee(hearings, e.target.value); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estimated Hearings Count (₹1,000 per hearing)</label>
                <input
                  type="number"
                  value={hearings}
                  onChange={(e) => { setHearings(e.target.value); calculateFee(e.target.value, baseFee); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Estimated Legal Service Billing:</span>
              <span className="text-xl font-extrabold text-slate-800">₹{totalFee}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {tool === "percent" && (
        <GlassCard accent="#06B6D4">
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-slate-700 text-sm">Calculate Contingency Share</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Settlement/Award Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); calculatePercentVal(e.target.value, percentVal); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Contingency Fee %</label>
                <input
                  type="number"
                  value={percentVal}
                  onChange={(e) => { setPercentVal(e.target.value); calculatePercentVal(amount, e.target.value); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Calculated Firm Commission:</span>
              <span className="text-xl font-extrabold text-slate-800">₹{calculatedPercent}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {tool === "stamp" && (
        <GlassCard accent="#06B6D4">
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-slate-700 text-sm">Calculate State Stamp Duty</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Consideration Value of Property (₹)</label>
                <input
                  type="number"
                  value={propertyVal}
                  onChange={(e) => { setPropertyVal(e.target.value); calculateStampDuty(e.target.value, stampDutyRate); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stamp Duty Percentage (%)</label>
                <input
                  type="number"
                  value={stampDutyRate}
                  onChange={(e) => { setStampDutyRate(e.target.value); calculateStampDuty(propertyVal, e.target.value); }}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-sm outline-none"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-600">Calculated Stamp Registration Fee:</span>
              <span className="text-xl font-extrabold text-slate-800">₹{stampDutyFee}</span>
            </div>
          </div>
        </GlassCard>
      )}

      {(tool === "area" || tool === "converter") && (
        <GlassCard accent="#06B6D4">
          <div className="p-5 space-y-3">
            <h3 className="font-bold text-slate-700 text-sm">Converter / Estimator</h3>
            <p className="text-xs text-slate-500 font-medium">Quick conversion charts for land measurements (Ankanam, Cent, Square Yards, Square Feet).</p>
            <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
              <div className="flex justify-between py-2"><span>1 Cent</span><span>435.6 Sq Ft</span></div>
              <div className="flex justify-between py-2"><span>1 Ankanam</span><span>72 Sq Ft</span></div>
              <div className="flex justify-between py-2"><span>1 Acre</span><span>100 Cents</span></div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
