import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function LandingPage() {
  const { setCurrentPage, loginAs, impactStats, nearbyNgos } = useApp();

  // Interactive AI Sandbox State for Landing Page
  const [sandboxFood, setSandboxFood] = useState('Cooked Chicken Curry & Basmati Rice');
  const [sandboxQuantity, setSandboxQuantity] = useState(40);
  const [sandboxCategory, setSandboxCategory] = useState('Cooked Meals');
  const [sandboxPrepTime, setSandboxPrepTime] = useState('2 hours ago');
  const [sandboxResult, setSandboxResult] = useState({
    urgency: 'HIGH',
    urgencyColor: 'text-amber-600 bg-amber-50 border-amber-200',
    shelfLife: '3.5 Hours remaining',
    co2Saved: '100.0 kg',
    waterSaved: '1,600 L',
    matchedNgo: 'City Hope Community Shelter (2.3 km away)',
    confidence: '99.4%'
  });

  const runAiSandbox = (food, qty, cat) => {
    setSandboxFood(food);
    setSandboxQuantity(qty);
    setSandboxCategory(cat);

    let urg = 'MEDIUM';
    let urgCol = 'text-blue-600 bg-blue-50 border-blue-200';
    let shelf = '6 Hours remaining';

    if (cat === 'Cooked Meals') {
      urg = qty > 30 ? 'CRITICAL' : 'HIGH';
      urgCol = urg === 'CRITICAL' ? 'text-red-600 bg-red-50 border-red-200' : 'text-amber-600 bg-amber-50 border-amber-200';
      shelf = '2.5 - 4 Hours remaining';
    } else if (cat === 'Bakery') {
      urg = 'MEDIUM';
      urgCol = 'text-blue-600 bg-blue-50 border-blue-200';
      shelf = '18 Hours remaining';
    } else {
      urg = 'LOW';
      urgCol = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      shelf = '48+ Hours remaining';
    }

    setSandboxResult({
      urgency: urg,
      urgencyColor: urgCol,
      shelfLife: shelf,
      co2Saved: (qty * 2.5).toFixed(1) + ' kg',
      waterSaved: (qty * 40).toLocaleString() + ' L',
      matchedNgo: `${nearbyNgos[0]?.name || 'City Hope Shelter'} (${Math.round(qty * 2.2)} meals needed)`,
      confidence: '99.4%'
    });
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background glow elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-brand-100/60 to-transparent pointer-events-none -z-10 rounded-full blur-3xl opacity-70"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-ping"></span>
                <span>AI-Powered Zero Hunger & Waste Reduction Engine</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.1]">
                Turning Surplus Food Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500">Hope.</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                AI-powered food redistribution connecting restaurants, hostels, event caterers, and supermarkets with nearby verified NGOs and shelters in real time.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentPage('add-food')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-base shadow-lg shadow-brand-700/25 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🍽️ Donate Food Now</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  onClick={() => setCurrentPage('ngo-marketplace')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-sm transition flex items-center justify-center gap-2"
                >
                  <span>🏢 Find Surplus Food (NGO)</span>
                </button>
              </div>

              {/* Quick Persona Demo Links */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Quick Test Portals:</span>
                <button onClick={() => loginAs('provider')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">
                  Restaurant Demo
                </button>
                <button onClick={() => loginAs('ngo')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">
                  Shelter Demo
                </button>
                <button onClick={() => loginAs('volunteer')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">
                  Driver Dispatch
                </button>
                <button onClick={() => loginAs('admin')} className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition">
                  City Admin
                </button>
              </div>

            </div>

            {/* Right Col: Hero Interactive Card & Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-3 bg-gradient-to-br from-slate-100 to-slate-200/50 shadow-2xl border border-slate-200">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" 
                    alt="Volunteers organizing healthy hot meals" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-brand-500 text-white w-fit mb-1">
                      Live AI Dispatch
                    </span>
                    <h3 className="font-display font-bold text-lg leading-snug">
                      75 Hot Meals Dispatched from Grand Harvest Bistro
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Matched to City Hope Shelter &bull; Arrival in 12 mins
                    </p>
                  </div>
                </div>

                {/* Floating Metric Pill 1 */}
                <div className="absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-lg">
                    ⚡
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Avg Response Time</p>
                    <p className="text-sm font-extrabold text-slate-900 font-display">28 Minutes Pickup</p>
                  </div>
                </div>

                {/* Floating Metric Pill 2 */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                    🌿
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400">Zero Edible Waste</p>
                    <p className="text-xs font-bold text-slate-800">100% Verified Safe</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 shadow-card border border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">
              {impactStats.totalKgSaved.toLocaleString()} <span className="text-xl text-slate-400">kg</span>
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Surplus Food Rescued</p>
          </div>

          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">
              {impactStats.totalMealsServed.toLocaleString()}
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Nutritious Meals Served</p>
          </div>

          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">
              {impactStats.activeNgosCount}+
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Verified Shelter Partners</p>
          </div>

          <div className="pt-4 md:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-brand-700">
              {impactStats.totalCo2PreventedKg.toLocaleString()} <span className="text-xl text-slate-400">kg</span>
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">CO₂ Emissions Diverted</p>
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE AI DEMO SANDBOX ON LANDING PAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Intro */}
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-400/30 uppercase tracking-wider">
                ⚡ Try Interactive AI Sandbox
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
                Experience AI Food Urgency & Matching Engine
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Test how our proprietary AI categorizes surplus dishes, computes safe consumption windows, calculates carbon offsets, and assigns priority shelters instantly.
              </p>

              {/* Sample Presets */}
              <div className="pt-2">
                <p className="text-xs text-slate-400 font-semibold mb-2">Click Quick Presets to Test:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => runAiSandbox('Corporate Buffet: Dal Makhani & Biryani', 55, 'Cooked Meals')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                  >
                    🍛 Banquet Hot Curry (55 kg)
                  </button>
                  <button
                    onClick={() => runAiSandbox('Artisan Brioche & Croissants', 18, 'Bakery')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                  >
                    🥐 Fresh Bakery (18 kg)
                  </button>
                  <button
                    onClick={() => runAiSandbox('Hydroponic Greens & Veggies', 45, 'Produce')}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
                  >
                    🥗 Farm Produce (45 kg)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sandbox Terminal */}
            <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-mono text-slate-400 ml-2">FoodConnect-AI-Engine-v3.4</span>
                </div>
                <span className="text-xs text-brand-400 font-mono font-semibold">Status: ONLINE</span>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Food Item Name</label>
                  <input
                    type="text"
                    value={sandboxFood}
                    onChange={(e) => runAiSandbox(e.target.value, sandboxQuantity, sandboxCategory)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Quantity (Kilograms)</label>
                  <input
                    type="number"
                    value={sandboxQuantity}
                    onChange={(e) => runAiSandbox(sandboxFood, Number(e.target.value), sandboxCategory)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Real-time AI Computed Output Display */}
              <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">AI Urgency Rating:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${sandboxResult.urgencyColor}`}>
                    {sandboxResult.urgency} PRIORITY
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center">
                  <div className="bg-slate-900 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500">Safe Window</p>
                    <p className="text-xs font-bold text-white mt-0.5">{sandboxResult.shelfLife}</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500">CO₂ Avoided</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">{sandboxResult.co2Saved}</p>
                  </div>
                  <div className="bg-slate-900 p-2 rounded-lg">
                    <p className="text-[10px] text-slate-500">Water Saved</p>
                    <p className="text-xs font-bold text-blue-400 mt-0.5">{sandboxResult.waterSaved}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-400">
                    🎯 Top Proximity NGO Match: <strong className="text-white">{sandboxResult.matchedNgo}</strong>
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentPage('add-food')}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold transition flex items-center gap-1.5"
                >
                  <span>Post Real Donation With This AI &rarr;</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Seamless 4-Step Redistribution
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
            How FoodConnect AI Solves Food Waste
          </h2>
          <p className="text-slate-600 text-base">
            From kitchen surplus to community dining tables in under 45 minutes through smart algorithmic matching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition relative group">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4 group-hover:scale-110 transition">
              1
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">Provider Lists Surplus</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Restaurants or event caterers log surplus food in seconds with category, quantity, prep time, and storage conditions.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition relative group">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4 group-hover:scale-110 transition">
              2
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">AI Analyzes & Matches</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              AI evaluates perishability, temperature, and dietary flags, immediately alerting the closest high-capacity verified shelter.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition relative group">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4 group-hover:scale-110 transition">
              3
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">Rapid Volunteer Pickup</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Volunteers or NGO couriers receive GPS turn-by-turn routes and verify handover using dynamic 4-digit PIN / QR codes.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-200 hover:shadow-card-hover transition relative group">
            <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xl font-display mb-4 group-hover:scale-110 transition">
              4
            </div>
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2">Verified ESG Impact</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Recipient shelter confirms safe delivery. Providers instantly receive automated CSR tax exemption certificates and carbon logs.
            </p>
          </div>

        </div>
      </section>

      {/* 5. KEY FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-3xl p-8 sm:p-12 border border-slate-200">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Platform Capabilities</span>
            <h2 className="font-display font-black text-3xl text-slate-900 tracking-tight mt-1">
              Engineered for Speed, Food Safety & Social Good
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center text-xl">
                🧠
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">AI Freshness & Urgency Matrix</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automatically determines spoilage risks by correlating food moisture, ambient temperatures, and packaging standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center text-xl">
                📍
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">Smart NGO Proximity Engine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Matches food with NGOs having active meal deficits, dietary compatibility, and capacity to collect within 30 minutes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center text-xl">
                🛡️
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">Good Samaritan Non-Liability</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Full legal compliance framework and automated temperature inspection logs ensuring safe donations without liability risks.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-brand-900 rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Ready to Turn Your Surplus Food Into Smiles?
            </h2>
            <p className="text-brand-100 text-base sm:text-lg">
              Join 380+ restaurants, bakeries, hostels and 140+ community shelters already making a tangible impact daily.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setCurrentPage('add-food')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-base shadow-lg transition active:scale-95"
              >
                Start Donating Food Today
              </button>
              <button
                onClick={() => setCurrentPage('ngo-marketplace')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-900/60 hover:bg-brand-900 text-white font-bold text-base border border-brand-400/40 transition"
              >
                Register Your NGO / Shelter
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
