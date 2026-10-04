import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function VolunteerPage() {
  const { 
    currentUser, 
    listings, 
    setCurrentPage, 
    setTrackedItem, 
    updateDeliveryStep, 
    showToast 
  } = useApp();

  const activeRuns = listings.filter(item => item.status === 'CLAIMED' || item.status === 'IN_TRANSIT');

  const handleAcceptMission = (item) => {
    setTrackedItem(item);
    updateDeliveryStep(item.id, 2);
    setCurrentPage('live-tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-2xl shadow">
            🚚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl text-slate-900">
                Volunteer Courier Dispatch
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Driver On-Duty
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentUser.name} &bull; {currentUser.vehicle || 'Electric Cargo Van'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
            🏆 87 Completed Rescue Runs
          </span>
          <button
            onClick={() => showToast('Status set to Ready for Express Pickups!', 'success')}
            className="px-4 py-2 rounded-xl bg-brand-700 text-white text-xs font-bold shadow"
          >
            Active & Ready
          </button>
        </div>
      </div>

      {/* Available Pickup Runs */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">Available Rescue Runs Nearby</h2>
            <p className="text-xs text-slate-500">Pick up from food providers and deliver safely to recipient shelters</p>
          </div>
          <span className="text-xs font-bold bg-brand-100 text-brand-800 px-3 py-1 rounded-full">
            {activeRuns.length} Runs In Queue
          </span>
        </div>

        {activeRuns.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            No pending rescue runs right now. All surplus items currently delivered or awaiting claim.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeRuns.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:shadow-md transition space-y-4">
                
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      ORDER #{item.id}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-base mt-1">{item.title}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${item.urgencyColor}`}>
                    {item.urgencyScore}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-brand-700 font-bold">A (Pickup):</span>
                    <div>
                      <p className="font-bold text-slate-800">{item.providerName}</p>
                      <p className="text-[11px] text-slate-500">{item.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                    <span className="text-blue-600 font-bold">B (Drop-off):</span>
                    <div>
                      <p className="font-bold text-slate-800">{item.claimedBy?.ngoName || 'City Hope Shelter'}</p>
                      <p className="text-[11px] text-slate-500">{item.claimedBy?.ngoAddress || '89 Mission Way'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Weight: <strong>{item.quantityKg} kg ({item.mealCount} meals)</strong></span>
                  <span>Est Trip: <strong>~18 mins (4.2 km)</strong></span>
                </div>

                <button
                  onClick={() => handleAcceptMission(item)}
                  className="w-full py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95"
                >
                  🚀 Accept Mission & Open Turn-by-Turn GPS
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
