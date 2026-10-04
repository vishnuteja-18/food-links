import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function NgoMarketplacePage() {
  const { 
    listings, 
    claimFoodListing, 
    currentUser, 
    setCurrentPage, 
    setTrackedItem 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [urgencyFilter, setUrgencyFilter] = useState('ALL');
  const [maxDistance, setMaxDistance] = useState(10);
  const [dietaryVegOnly, setDietaryVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClaimListing, setSelectedClaimListing] = useState(null);
  const [claimVolunteerOption, setClaimVolunteerOption] = useState('rapid_fleet');
  const [arrivalMinutes, setArrivalMinutes] = useState(25);

  const availableListings = listings.filter(item => item.status === 'AVAILABLE');

  const filteredListings = availableListings.filter(item => {
    if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;
    if (urgencyFilter !== 'ALL' && item.urgencyScore !== urgencyFilter) return false;
    if (item.distanceKm > maxDistance) return false;
    if (dietaryVegOnly && !item.isVeg) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.providerName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleClaimConfirm = () => {
    if (!selectedClaimListing) return;

    claimFoodListing(selectedClaimListing.id, {
      orgName: currentUser.orgName || 'City Hope Community Shelter',
      address: currentUser.address || '89 Mission Way, Central District',
      contact: currentUser.name + ` (${currentUser.phone})`,
      volunteerOption: claimVolunteerOption,
      etaMinutes: arrivalMinutes
    });

    setSelectedClaimListing(null);
    setCurrentPage('live-tracking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 uppercase tracking-wider">
              🟢 Live Surplus Discovery Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {availableListings.length} Active Donations
            </span>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2">
            Discover & Claim Surplus Food
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time feed of edible surplus dishes verified and ready for immediate community redistribution.
          </p>
        </div>

        {/* View Active Claims Button */}
        <button
          onClick={() => setCurrentPage('live-tracking')}
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow transition flex items-center gap-2"
        >
          <span>📍 Track Active Pickups</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Search Food or Provider</label>
            <input
              type="text"
              placeholder="e.g. Rice, Bistro, Bakery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            >
              <option value="ALL">All Categories</option>
              <option value="Cooked Meals">Cooked Meals / Buffets</option>
              <option value="Bakery & Bread">Bakery & Bread</option>
              <option value="Fresh Produce">Fresh Produce</option>
              <option value="Packaged Goods">Dairy & Packaged</option>
            </select>
          </div>

          {/* Urgency */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">AI Urgency Priority</label>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            >
              <option value="ALL">All Urgencies</option>
              <option value="CRITICAL">🔴 Critical (Pickup &lt; 2 hrs)</option>
              <option value="HIGH">🟠 High Priority (Pickup &lt; 4 hrs)</option>
              <option value="MEDIUM">🔵 Medium Priority (Today)</option>
              <option value="LOW">🟢 Low Priority (2-3 Days)</option>
            </select>
          </div>

          {/* Distance Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase mb-1">
              <span>Max Distance</span>
              <span className="text-slate-800">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer mt-2"
            />
          </div>

        </div>

        {/* Veg toggle */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={dietaryVegOnly}
              onChange={(e) => setDietaryVegOnly(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
            <span>Show Vegetarian Only 🥦</span>
          </label>
          <span className="text-xs text-slate-400">
            Showing <strong>{filteredListings.length}</strong> matching donations
          </span>
        </div>

      </div>

      {/* Food Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-card border border-slate-200 space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto text-2xl">
            🍲
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900">No surplus donations match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try expanding your distance radius or clearing category filters to view available donations.
          </p>
          <button
            onClick={() => { setCategoryFilter('ALL'); setUrgencyFilter('ALL'); setMaxDistance(25); setDietaryVegOnly(false); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white shadow ${item.urgencyColor}`}>
                      {item.urgencyScore} URGENCY
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800">
                      {item.distanceKm} km away
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold truncate opacity-90">{item.providerName}</p>
                    <p className="text-[10px] text-slate-300">{item.address}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <h3 className="font-display font-bold text-slate-900 text-base leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Quantity & Servings badge */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">QUANTITY</span>
                      <strong className="text-brand-800 text-sm font-display">{item.quantityKg} kg</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">FEEDS</span>
                      <strong className="text-slate-800 text-sm font-display">≈ {item.mealCount} people</strong>
                    </div>
                  </div>

                  {/* Dietary & Storage */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-slate-400">🌡️ Storage:</span>
                      <span className="font-medium truncate">{item.storageType}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="text-slate-400">🥗 Tags:</span>
                      <span className="font-medium truncate">{item.dietary?.join(', ')}</span>
                    </div>
                  </div>

                  {/* AI Recommendation Reason */}
                  <div className="bg-brand-50/80 rounded-xl p-3 border border-brand-200/80 text-[11px] text-brand-900 space-y-1">
                    <p className="font-bold flex items-center gap-1">
                      <span>⚡ AI Urgency Insight:</span>
                    </p>
                    <p className="text-slate-600 leading-snug">
                      {item.aiInsights?.urgencyReason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Claim Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedClaimListing(item)}
                  className="w-full py-3 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Claim For Redistribution</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Interactive Claim Modal */}
      {selectedClaimListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 relative">
            
            <button
              onClick={() => setSelectedClaimListing(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              ✕
            </button>

            <div className="space-y-2 pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200 uppercase">
                Confirm Claim & Dispatch
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900">
                Claim Food Donation #{selectedClaimListing.id}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{selectedClaimListing.title}</p>
            </div>

            <div className="my-4 space-y-4">
              
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs">
                <p className="text-slate-500">Provider: <strong>{selectedClaimListing.providerName}</strong></p>
                <p className="text-slate-500">Address: <strong>{selectedClaimListing.address} ({selectedClaimListing.distanceKm} km away)</strong></p>
                <p className="text-slate-500">Quantity: <strong>{selectedClaimListing.quantityKg} kg ({selectedClaimListing.mealCount} meals)</strong></p>
              </div>

              {/* Volunteer Fleet Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Pickup Logistics Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-brand-500 bg-brand-50/60 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="vol"
                        checked={claimVolunteerOption === 'rapid_fleet'}
                        onChange={() => setClaimVolunteerOption('rapid_fleet')}
                        className="text-brand-600"
                      />
                      <div>
                        <p className="font-bold text-slate-900">Auto-Assign Rapid Volunteer EV Fleet (Recommended)</p>
                        <p className="text-[11px] text-slate-500">Temperature-controlled van arriving in ~18 mins</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="vol"
                        checked={claimVolunteerOption === 'self_pickup'}
                        onChange={() => setClaimVolunteerOption('self_pickup')}
                        className="text-brand-600"
                      />
                      <div>
                        <p className="font-bold text-slate-900">Self-Pickup by Shelter Staff</p>
                        <p className="text-[11px] text-slate-500">Our vehicle will collect within 30 minutes</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Health and safety confirmation */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                ⚠️ <strong>Food Safety Pledge:</strong> By claiming this surplus, your shelter agrees to distribute or store food under proper temperature guidelines upon arrival.
              </div>

            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedClaimListing(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClaimConfirm}
                className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95 flex items-center gap-2"
              >
                <span>Confirm Claim & Generate OTP</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
