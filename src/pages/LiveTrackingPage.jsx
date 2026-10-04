import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function LiveTrackingPage() {
  const { 
    trackedItem, 
    setTrackedItem, 
    listings, 
    updateDeliveryStep, 
    setSelectedQrItem, 
    setCertificateItem,
    showToast 
  } = useApp();

  // Find all active trackable listings (Claimed, In Transit, Delivered)
  const trackableListings = listings.filter(i => i.status !== 'AVAILABLE');
  const currentItem = trackedItem || trackableListings[0];

  if (!currentItem || !currentItem.tracking) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto text-2xl">
          🚚
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-900">No Active Deliveries in Transit</h2>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Claim a surplus food donation from the NGO Marketplace or list a new item to see real-time route simulation.
        </p>
      </div>
    );
  }

  const currentStep = currentItem.tracking.step || 1;

  const copyPin = (pin) => {
    navigator.clipboard?.writeText(pin);
    showToast(`Copied PIN: ${pin}`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping"></span>
            <span className="text-xs font-mono font-bold text-brand-700 uppercase">
              LIVE TELEMETRY & ROUTE DISPATCH
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
            Real-Time Logistics Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tracking order <strong>#{currentItem.id}</strong> &bull; {currentItem.title}
          </p>
        </div>

        {/* Quick select other trackables */}
        {trackableListings.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Switch Order:</span>
            <select
              value={currentItem.id}
              onChange={(e) => {
                const found = trackableListings.find(l => l.id === e.target.value);
                if (found) setTrackedItem(found);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none"
            >
              {trackableListings.map(t => (
                <option key={t.id} value={t.id}>
                  #{t.id} - {t.title.slice(0, 25)}... ({t.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid: Map Simulation & Stepper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col (7 cols): Interactive Visual Map Simulation */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-card border border-slate-200 space-y-6">
          
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900">Live GPS Route & Fleet Position</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              GPS Linked (99.8%)
            </span>
          </div>

          {/* Stylized Interactive Map Canvas Canvas simulation */}
          <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex items-center justify-center p-4">
            
            {/* Map Grid Vector Lines */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Roads & Waypoints SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
              {/* Road paths */}
              <path d="M 50 150 Q 150 70 200 150 T 350 150" fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
              <path d="M 50 150 Q 150 70 200 150 T 350 150" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="6 4" />
              
              {/* Point A: Provider */}
              <circle cx="50" cy="150" r="14" fill="#15803D" />
              <text x="50" y="154" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">🍽️</text>
              <text x="50" y="180" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">Provider</text>

              {/* Point B: NGO Shelter */}
              <circle cx="350" cy="150" r="14" fill="#1E293B" stroke="#22C55E" strokeWidth="2" />
              <text x="350" y="154" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">🏢</text>
              <text x="350" y="180" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">Shelter</text>

              {/* Moving Courier Van Marker based on step */}
              {currentStep === 1 && (
                <g transform="translate(70, 130)">
                  <circle cx="0" cy="0" r="16" fill="#F59E0B" className="animate-pulse" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">🚚</text>
                </g>
              )}
              {currentStep === 2 && (
                <g transform="translate(130, 100)">
                  <circle cx="0" cy="0" r="16" fill="#F59E0B" className="animate-pulse" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">🚚</text>
                </g>
              )}
              {currentStep === 3 && (
                <g transform="translate(240, 170)">
                  <circle cx="0" cy="0" r="16" fill="#22C55E" className="animate-pulse" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">🚚</text>
                </g>
              )}
              {currentStep === 4 && (
                <g transform="translate(350, 150)">
                  <circle cx="0" cy="0" r="18" fill="#16A34A" />
                  <text x="0" y="4" fill="white" fontSize="12" textAnchor="middle">✅</text>
                </g>
              )}
            </svg>

            {/* Overlay Telemetry HUD */}
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur-md rounded-xl p-3 border border-slate-700 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-brand-400 animate-ping"></div>
                <div>
                  <p className="font-bold">{currentItem.tracking.statusText}</p>
                  <p className="text-[11px] text-slate-400">Driver: {currentItem.tracking.driverName}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block font-bold">Estimated Arrival</span>
                <strong className="text-brand-400 font-mono text-sm">
                  {currentStep === 4 ? 'Arrived' : `~${currentItem.tracking.etaMinutes || 12} mins`}
                </strong>
              </div>
            </div>

          </div>

          {/* Driver & Transport Info Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center font-bold text-lg">
                🚚
              </div>
              <div>
                <p className="font-display font-bold text-sm text-slate-900">{currentItem.tracking.driverName}</p>
                <p className="text-xs text-slate-500">{currentItem.tracking.driverVehicle}</p>
              </div>
            </div>
            <a
              href={`tel:${currentItem.tracking.driverPhone}`}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <span>📞 Call Driver</span>
            </a>
          </div>

        </div>

        {/* Right Col (5 cols): Stepper & Verification Actions */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-slate-900">Milestone Progress</h3>

            {/* Stepper Vertical List */}
            <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              
              {/* Step 1 */}
              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                  currentStep >= 1 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'
                }`}>
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Claim Confirmed by Shelter</h4>
                  <p className="text-[11px] text-slate-500">{currentItem.claimedBy?.ngoName || 'City Hope Shelter'}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                  currentStep >= 2 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'
                }`}>
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Driver En Route to Provider</h4>
                  <p className="text-[11px] text-slate-500">{currentItem.providerName}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                  currentStep >= 3 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'
                }`}>
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Food Picked Up & In Transit</h4>
                  <p className="text-[11px] text-slate-500">Cold-chain / Hot insulation verified</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                  currentStep >= 4 ? 'bg-brand-700 text-white shadow' : 'bg-slate-100 text-slate-400'
                }`}>
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Delivered & Impact Verified</h4>
                  <p className="text-[11px] text-slate-500">Meals ready for serving</p>
                </div>
              </div>

            </div>

            {/* OTP Handoff Section */}
            <div className="bg-brand-50/70 rounded-2xl p-4 border border-brand-200 space-y-2">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider block">
                🔐 Courier Handover PINs
              </span>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-brand-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Pickup OTP</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-extrabold text-slate-900 text-base">{currentItem.tracking.pickupOtp || '8492'}</span>
                    <button onClick={() => copyPin(currentItem.tracking.pickupOtp || '8492')} className="text-xs text-brand-700 hover:underline">Copy</button>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-brand-200">
                  <span className="text-[10px] text-slate-400 block font-bold">Delivery OTP</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono font-extrabold text-slate-900 text-base">{currentItem.tracking.deliveryOtp || '3104'}</span>
                    <button onClick={() => copyPin(currentItem.tracking.deliveryOtp || '3104')} className="text-xs text-brand-700 hover:underline">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advance Step Simulation Controls for Demo */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Demo Stage Advancement:</p>
            <div className="grid grid-cols-2 gap-2">
              {currentStep < 4 ? (
                <button
                  onClick={() => updateDeliveryStep(currentItem.id, currentStep + 1)}
                  className="col-span-2 py-3 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Simulate Next Stage ({currentStep + 1}/4) &rarr;</span>
                </button>
              ) : (
                <button
                  onClick={() => setCertificateItem({
                    orgName: currentItem.providerName,
                    address: currentItem.address,
                    quantityKg: currentItem.quantityKg,
                    mealCount: currentItem.mealCount,
                    co2Saved: currentItem.aiInsights.co2SavedKg
                  })}
                  className="col-span-2 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition"
                >
                  📜 View Delivery Impact Certificate
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
