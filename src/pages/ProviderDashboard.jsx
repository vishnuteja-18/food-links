import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ProviderDashboard() {
  const { 
    currentUser, 
    listings, 
    setCurrentPage, 
    setSelectedQrItem, 
    setCertificateItem, 
    setTrackedItem, 
    aiInsights,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'available', 'claimed', 'in_transit', 'delivered'
  const [searchQuery, setSearchQuery] = useState('');

  // Provider's own listings
  const myListings = listings.filter(item => 
    item.providerId === currentUser.id || item.providerName.includes('Harvest') || item.providerName.includes('Grand')
  );

  const filteredListings = myListings.filter(item => {
    if (activeTab === 'available' && item.status !== 'AVAILABLE') return false;
    if (activeTab === 'claimed' && item.status !== 'CLAIMED') return false;
    if (activeTab === 'in_transit' && item.status !== 'IN_TRANSIT') return false;
    if (activeTab === 'delivered' && item.status !== 'DELIVERED') return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalKg = myListings.reduce((sum, item) => sum + (item.quantityKg || 0), 0);
  const activeCount = myListings.filter(i => i.status === 'AVAILABLE' || i.status === 'CLAIMED' || i.status === 'IN_TRANSIT').length;
  const completedCount = myListings.filter(i => i.status === 'DELIVERED').length;
  const pendingPickupCount = myListings.filter(i => i.status === 'CLAIMED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200'} 
            alt="Provider Logo" 
            className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500/20 shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-2xl text-slate-900">
                {currentUser?.orgName || 'The Grand Harvest Bistro'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200">
                Verified Provider
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Logged in as {currentUser?.name} &bull; {currentUser?.address}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setCertificateItem({
              orgName: currentUser?.orgName || 'The Grand Harvest Bistro',
              address: currentUser?.address || '428 Metro Boulevard',
              quantityKg: totalKg,
              mealCount: Math.round(totalKg * 2.2),
              co2Saved: (totalKg * 2.5).toFixed(0)
            })}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition"
          >
            📜 CSR Certificate
          </button>
          
          <button
            onClick={() => setCurrentPage('add-food')}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="text-base">+</span>
            <span>Add Surplus Food</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Rescued</span>
            <span className="text-lg">⚖️</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            {totalKg} <span className="text-sm font-semibold text-slate-400">kg</span>
          </p>
          <p className="text-[11px] text-brand-700 font-semibold mt-1">
            ≈ {Math.round(totalKg * 2.2)} meals served
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Listings</span>
            <span className="text-lg">📦</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-brand-700">
            {activeCount}
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Live in marketplace
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Awaiting Pickup</span>
            <span className="text-lg">🚚</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600">
            {pendingPickupCount}
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Couriers assigned
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
            <span className="text-lg">✅</span>
          </div>
          <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900">
            {completedCount}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            100% Verified Delivery
          </p>
        </div>

      </div>

      {/* AI Donation Insights Banner */}
      <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulse"></span>
            <h3 className="font-display font-bold text-sm text-white">AI Real-Time Optimization Insights</h3>
          </div>
          <span className="text-[11px] font-mono text-brand-300">Predictive Engine: Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight) => (
            <div key={insight.id} className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-500/30 text-brand-200 border border-brand-400/30">
                  {insight.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{insight.confidence}</span>
              </div>
              <h4 className="font-display font-bold text-xs text-white leading-snug">{insight.title}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* My Listings Management Section */}
      <div className="bg-white rounded-3xl shadow-card border border-slate-200 p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">Manage Surplus Food Listings</h2>
            <p className="text-xs text-slate-500 mt-0.5">Track claims, courier handoffs, and verification OTPs</p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search your listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-600"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
          {['all', 'available', 'claimed', 'in_transit', 'delivered'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                activeTab === tab ? 'bg-brand-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Listings Cards */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
              🍲
            </div>
            <p className="text-sm font-semibold text-slate-700">No surplus food listings match this filter.</p>
            <button
              onClick={() => setCurrentPage('add-food')}
              className="px-4 py-2 rounded-xl bg-brand-700 text-white text-xs font-bold"
            >
              + List Surplus Food Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((item) => (
              <div 
                key={item.id} 
                className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Image & Urgency Banner */}
                  <div className="relative h-44 w-full">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow ${item.urgencyColor}`}>
                        {item.urgencyScore} URGENCY
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-white font-bold">
                        #{item.id}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow ${
                        item.status === 'AVAILABLE' ? 'bg-emerald-500 text-white' :
                        item.status === 'CLAIMED' ? 'bg-amber-500 text-white' :
                        item.status === 'IN_TRANSIT' ? 'bg-blue-600 text-white' :
                        'bg-slate-800 text-white'
                      }`}>
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-display font-bold text-slate-900 text-base leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">QUANTITY</span>
                        <strong className="text-slate-800">{item.quantityKg} kg</strong> ({item.mealCount} meals)
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">STORAGE</span>
                        <span className="text-slate-800 truncate block">{item.storageType}</span>
                      </div>
                    </div>

                    {/* AI Insights Chip */}
                    <div className="bg-brand-50/70 rounded-xl p-2.5 border border-brand-200/80 text-[11px] text-brand-900">
                      <span className="font-bold">⚡ AI Safe Window:</span> {item.aiInsights.shelfLifeEstimate}
                    </div>

                    {/* Claimed info if claimed */}
                    {item.claimedBy && (
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 text-xs">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Claimed By:</p>
                        <p className="font-bold text-slate-800">{item.claimedBy.ngoName}</p>
                        <p className="text-[11px] text-slate-500">{item.claimedBy.contact}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-2">
                  {item.status === 'CLAIMED' || item.status === 'IN_TRANSIT' ? (
                    <>
                      <button
                        onClick={() => setSelectedQrItem(item)}
                        className="flex-1 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition"
                      >
                        📱 Handoff PIN / QR
                      </button>
                      <button
                        onClick={() => {
                          setTrackedItem(item);
                          setCurrentPage('live-tracking');
                        }}
                        className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      >
                        📍 Track Courier
                      </button>
                    </>
                  ) : item.status === 'DELIVERED' ? (
                    <button
                      onClick={() => setCertificateItem({
                        orgName: currentUser?.orgName || item.providerName,
                        address: item.address,
                        quantityKg: item.quantityKg,
                        mealCount: item.mealCount,
                        co2Saved: item.aiInsights.co2SavedKg
                      })}
                      className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
                    >
                      📜 View Verified CSR Certificate
                    </button>
                  ) : (
                    <div className="w-full text-center py-1.5 text-xs font-medium text-slate-500 bg-slate-50 rounded-xl">
                      Waiting for nearby NGO claim...
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
