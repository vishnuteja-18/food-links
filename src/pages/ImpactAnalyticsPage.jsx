import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ImpactAnalyticsPage() {
  const { impactStats, currentUser, setCertificateItem } = useApp();
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-wider">
            🌿 National Social Impact & ESG Hub
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
            Food Redistribution & Climate Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time verified environmental offset and hunger relief metrics audited under Good Samaritan safety guidelines.
          </p>
        </div>

        {/* Certificate trigger */}
        <button
          onClick={() => setCertificateItem({
            orgName: currentUser?.orgName || 'The Grand Harvest Bistro',
            address: currentUser?.address || '428 Metro Boulevard',
            quantityKg: '3,420',
            mealCount: '7,520',
            co2Saved: '8,550'
          })}
          className="px-5 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition flex items-center gap-2"
        >
          <span>📜 Generate Official CSR Certificate</span>
        </button>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Food Diverted</span>
            <span className="text-xl">🥗</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-brand-700">
            {impactStats.totalKgSaved.toLocaleString()} <span className="text-sm font-semibold text-slate-400">kg</span>
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">+24.5% vs previous quarter</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Meals Provided</span>
            <span className="text-xl">🍲</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">
            {impactStats.totalMealsServed.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">140+ Shelters fed daily</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">CO₂ Equivalent Saved</span>
            <span className="text-xl">🌱</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-emerald-600">
            {impactStats.totalCo2PreventedKg.toLocaleString()} <span className="text-sm font-semibold text-slate-400">kg</span>
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Methane & landfill averted</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">AI Route Accuracy</span>
            <span className="text-xl">⚡</span>
          </div>
          <p className="font-display font-extrabold text-3xl text-slate-900">
            {impactStats.aiMatchingAccuracy}%
          </p>
          <p className="text-[11px] text-brand-700 font-semibold mt-1">Avg 28m collection time</p>
        </div>

      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (8 cols): Monthly Redistribution Trend Bar & Line Visual */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Monthly Food Rescue Growth</h3>
              <p className="text-xs text-slate-500">Kilograms of surplus food redirected per month</p>
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
              {['1M', '3M', '6M', '1Y'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    timeRange === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Responsive SVG Bar Chart */}
          <div className="pt-4">
            <div className="h-64 w-full flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-4 border-b border-slate-100">
              {impactStats.monthlyRedistribution.map((m, idx) => {
                const heightPct = Math.round((m.kg / 40000) * 100);
                return (
                  <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                      {(m.kg / 1000).toFixed(1)}k
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[48px] bg-gradient-to-t from-brand-700 to-brand-400 rounded-t-xl transition-all duration-500 group-hover:scale-y-105 group-hover:shadow-lg group-hover:shadow-brand-500/30 relative"
                    >
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 mt-1">{m.month}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 pt-3">
              <span>May 2026</span>
              <span className="font-semibold text-brand-700">October 2026 (Peak Volume: 35.1k kg)</span>
            </div>
          </div>

        </div>

        {/* Right (4 cols): Category Breakdown */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6 flex flex-col justify-between">
          
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">Food Categories</h3>
            <p className="text-xs text-slate-500">Distribution by food typology</p>

            <div className="space-y-4 mt-6">
              {impactStats.categoryBreakdown.map((cat) => (
                <div key={cat.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{cat.name}</span>
                    <strong className="font-mono text-slate-900">{cat.percentage}%</strong>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      className="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-50 rounded-2xl p-4 border border-brand-200 text-xs text-brand-900 space-y-1">
            <p className="font-bold">🌱 Environmental Audit Note:</p>
            <p className="text-slate-600 leading-snug">
              Every 1 kg of cooked food diverted avoids approx 2.5 kg of CO₂ equivalent lifecycle emissions.
            </p>
          </div>

        </div>

      </div>

      {/* Live Platform Activity Feed */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-4">
        <h3 className="font-display font-bold text-lg text-slate-900">Real-Time Redistribution Audit Log</h3>
        
        <div className="divide-y divide-slate-100">
          {impactStats.recentRedistributionLog.map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                <span className="text-slate-800 font-medium">{log.text}</span>
              </div>
              <span className="text-slate-400 font-mono whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
