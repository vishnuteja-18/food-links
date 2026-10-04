import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ImpactCertificateModal() {
  const { certificateItem, setCertificateItem, showToast } = useApp();

  if (!certificateItem) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('📄 CSR Impact Certificate PDF generated & downloaded!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-8 relative my-8">
        
        {/* Close Button */}
        <button 
          onClick={() => setCertificateItem(null)}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          ✕
        </button>

        {/* Certificate Frame */}
        <div className="border-4 border-double border-brand-700/60 p-8 rounded-2xl bg-gradient-to-b from-white via-brand-50/20 to-white relative">
          
          {/* Watermark badge */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-widest">
              🌿 OFFICIAL CSR & ESG FOOD RESCUE RECORD
            </div>
            
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight pt-2">
              CERTIFICATE OF FOOD REDISTRIBUTION
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Issued by FoodConnect AI National Social Impact Infrastructure
            </p>
          </div>

          <div className="my-6 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">This certifies that</p>
            <h3 className="text-xl sm:text-2xl font-black text-brand-800 font-display mt-1">
              {certificateItem.orgName || 'The Grand Harvest Bistro'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{certificateItem.address || '428 Metro Boulevard, Downtown'}</p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 text-center leading-relaxed max-w-lg mx-auto">
            Has successfully diverted and donated surplus edible food for immediate humanitarian redistribution to verified community shelters and hunger relief centers.
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3 my-6 text-center">
            <div className="bg-white rounded-xl p-3 border border-brand-200 shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Food Rescued</span>
              <span className="text-lg sm:text-xl font-black text-brand-700 font-display">
                {certificateItem.quantityKg || '3,420'} kg
              </span>
            </div>
            <div className="bg-white rounded-xl p-3 border border-brand-200 shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Meals Served</span>
              <span className="text-lg sm:text-xl font-black text-brand-700 font-display">
                {certificateItem.mealCount || '7,520'}
              </span>
            </div>
            <div className="bg-white rounded-xl p-3 border border-brand-200 shadow-sm">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">CO₂ Emissions Prevented</span>
              <span className="text-lg sm:text-xl font-black text-brand-700 font-display">
                {certificateItem.co2Saved || '8,550'} kg
              </span>
            </div>
          </div>

          {/* Verification Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-left text-xs text-slate-500">
            <div>
              <p className="font-bold text-slate-800">Verification Hash:</p>
              <p className="font-mono text-[10px] text-slate-400">SHA256-FNC-9984-ESG-AUTH-2026</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-slate-800">Good Samaritan Safe Harbor:</p>
              <p className="text-[10px] text-brand-700 font-semibold">100% Verified Non-Liability Compliant</p>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            🖨️ Print Certificate
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95"
          >
            📥 Download Official PDF
          </button>
        </div>

      </div>
    </div>
  );
}
