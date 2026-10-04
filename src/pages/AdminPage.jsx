import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function AdminPage() {
  const { listings, nearbyNgos, impactStats, showToast } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-brand-400 uppercase">
              METROPOLITAN FOOD SECURITY PLATFORM CONTROL
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            City Impact & Redistribution Center
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Supervising food safety compliance, volunteer fleets, and algorithmic matching rates.
          </p>
        </div>

        <button
          onClick={() => showToast('Platform health diagnostics: All systems 100% nominal', 'success')}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow"
        >
          ⚡ Run System Diagnostics
        </button>
      </div>

      {/* Control KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Active Providers</span>
          <p className="font-display font-black text-2xl text-slate-900 mt-1">{impactStats.activeProvidersCount}</p>
          <span className="text-[10px] text-brand-700 font-semibold">100% Health Audited</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Verified NGOs</span>
          <p className="font-display font-black text-2xl text-slate-900 mt-1">{impactStats.activeNgosCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">4 Pending Approval</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Courier Fleet</span>
          <p className="font-display font-black text-2xl text-slate-900 mt-1">{impactStats.volunteerDriversCount}</p>
          <span className="text-[10px] text-blue-600 font-semibold">24 EV Vans Active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">AI Match Precision</span>
          <p className="font-display font-black text-2xl text-brand-700 mt-1">{impactStats.aiMatchingAccuracy}%</p>
          <span className="text-[10px] text-slate-500 font-semibold">Zero Spoilage Violations</span>
        </div>

      </div>

      {/* Verification Queue & Active Dispatch Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* NGO Verification Review */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">Shelter Verification Queue</h3>
            <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold">
              3 Pending
            </span>
          </div>

          <div className="space-y-3">
            {nearbyNgos.slice(0, 3).map((ngo) => (
              <div key={ngo.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-900">{ngo.name}</p>
                  <p className="text-[11px] text-slate-500">{ngo.address} &bull; Cap: {ngo.capacity} meals/day</p>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                    {ngo.verifiedBadge}
                  </span>
                </div>
                <button
                  onClick={() => showToast(`Verified ${ngo.name}`, 'success')}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-brand-50 border border-slate-200 text-xs font-bold text-brand-700"
                >
                  ✓ Re-verify
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Global Dispatch Audit Feed */}
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">Redistribution System Log</h3>
            <span className="text-xs bg-brand-100 text-brand-800 px-2.5 py-0.5 rounded-full font-bold">
              Live Stream
            </span>
          </div>

          <div className="space-y-2.5">
            {listings.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-700">#{item.id}</span>
                  <p className="font-medium text-slate-900 truncate max-w-xs">{item.title}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' :
                  item.status === 'CLAIMED' ? 'bg-amber-100 text-amber-800' :
                  item.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-800' :
                  'bg-slate-200 text-slate-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
