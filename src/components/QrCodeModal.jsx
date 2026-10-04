import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function QrCodeModal() {
  const { selectedQrItem, setSelectedQrItem, showToast } = useApp();

  if (!selectedQrItem) return null;

  const copyPin = (pin) => {
    navigator.clipboard?.writeText(pin);
    showToast(`Copied Security PIN: ${pin}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="text-left">
            <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              SECURE HANDOFF PROTOCOL
            </span>
            <h3 className="font-display font-bold text-slate-900 text-lg mt-1">
              Food Pickup Verification
            </h3>
          </div>
          <button 
            onClick={() => setSelectedQrItem(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Item Summary */}
        <div className="bg-slate-50 rounded-xl p-3 my-4 text-left border border-slate-200/80">
          <p className="text-xs font-bold text-slate-800 line-clamp-1">{selectedQrItem.title}</p>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
            <span>Listing: <strong>#{selectedQrItem.id}</strong></span>
            <span>Quantity: <strong>{selectedQrItem.quantityKg} kg ({selectedQrItem.mealCount} meals)</strong></span>
          </div>
        </div>

        {/* Simulated QR Code */}
        <div className="flex flex-col items-center justify-center p-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl my-2">
          <div className="w-48 h-48 bg-slate-950 p-3 rounded-xl flex flex-col items-center justify-center relative shadow-inner">
            {/* SVG stylized QR code matrix */}
            <svg className="w-full h-full text-white" viewBox="0 0 100 100" fill="currentColor">
              {/* Corner 1 */}
              <rect x="5" y="5" width="28" height="28" fill="white" rx="3" />
              <rect x="9" y="9" width="20" height="20" fill="black" rx="2" />
              <rect x="13" y="13" width="12" height="12" fill="white" rx="1" />
              {/* Corner 2 */}
              <rect x="67" y="5" width="28" height="28" fill="white" rx="3" />
              <rect x="71" y="9" width="20" height="20" fill="black" rx="2" />
              <rect x="75" y="13" width="12" height="12" fill="white" rx="1" />
              {/* Corner 3 */}
              <rect x="5" y="67" width="28" height="28" fill="white" rx="3" />
              <rect x="9" y="71" width="20" height="20" fill="black" rx="2" />
              <rect x="13" y="75" width="12" height="12" fill="white" rx="1" />
              {/* Random QR nodes */}
              <rect x="38" y="10" width="8" height="8" fill="white" />
              <rect x="50" y="10" width="8" height="8" fill="white" />
              <rect x="38" y="24" width="8" height="8" fill="white" />
              <rect x="50" y="36" width="8" height="8" fill="white" />
              <rect x="10" y="40" width="8" height="8" fill="white" />
              <rect x="22" y="40" width="8" height="8" fill="white" />
              <rect x="38" y="50" width="24" height="8" fill="white" />
              <rect x="70" y="42" width="8" height="8" fill="white" />
              <rect x="82" y="42" width="8" height="8" fill="white" />
              <rect x="70" y="56" width="18" height="8" fill="white" />
              <rect x="42" y="70" width="14" height="14" fill="white" />
              <rect x="65" y="75" width="24" height="8" fill="white" />
              <rect x="75" y="88" width="14" height="6" fill="white" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow">
                AI
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">Scan with Driver App during pickup handoff</p>
        </div>

        {/* 4-digit PIN fallback */}
        <div className="mt-4">
          <p className="text-xs text-slate-400 font-medium">Or provide 4-Digit Handover PIN to Courier:</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="px-5 py-2.5 rounded-xl bg-brand-50 border border-brand-300 text-brand-900 font-mono font-extrabold text-2xl tracking-widest shadow-sm">
              {selectedQrItem.tracking?.pickupOtp || '8492'}
            </div>
            <button
              onClick={() => copyPin(selectedQrItem.tracking?.pickupOtp || '8492')}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              title="Copy PIN"
            >
              📋
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setSelectedQrItem(null)}
          className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition"
        >
          Done / Close
        </button>

      </div>
    </div>
  );
}
