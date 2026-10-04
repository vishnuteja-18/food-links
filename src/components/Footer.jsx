import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Footer() {
  const { setCurrentPage, loginAs } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 7v5l3 3" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 12h8" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Food<span className="text-brand-400">Connect</span> <span className="text-xs px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-400/30">AI</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering food businesses and community shelters with AI predictive logistics. We eliminate edible food waste, fight urban hunger, and build climate resilience together.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-brand-400 border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                99.4% AI Match Efficiency
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
                🌱 372k+ kg CO₂ Prevented
              </span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentPage('landing')} className="hover:text-white transition">Home</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('provider-dashboard')} className="hover:text-white transition">Food Providers</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('ngo-marketplace')} className="hover:text-white transition">Shelters & NGOs</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('live-tracking')} className="hover:text-white transition">Live Logistics</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('volunteer-portal')} className="hover:text-white transition">Volunteer Drivers</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Role Quick Switch */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Demo Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => loginAs('provider')} className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <span>🍽️ Restaurant Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => loginAs('ngo')} className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <span>🏢 NGO Discovery Hub</span>
                </button>
              </li>
              <li>
                <button onClick={() => loginAs('volunteer')} className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <span>🚚 Courier Dispatch</span>
                </button>
              </li>
              <li>
                <button onClick={() => loginAs('admin')} className="hover:text-brand-400 transition flex items-center gap-1.5">
                  <span>🛡️ City Impact Admin</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Impact & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Impact & Trust</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('impact-analytics')} className="hover:text-white transition">
                  ESG & CSR Impact Report
                </button>
              </li>
              <li className="hover:text-slate-200 cursor-pointer">Food Safety Compliance</li>
              <li className="hover:text-slate-200 cursor-pointer">Good Samaritan Protection</li>
              <li className="hover:text-slate-200 cursor-pointer">Cold-Chain Temperature Logs</li>
              <li className="hover:text-slate-200 cursor-pointer">Tax Deduction Certificates</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FoodConnect AI Platform. Built for Social Good & Zero Waste.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Health & Safety Protocols</span>
            <span className="hover:text-slate-400 cursor-pointer">API Integration</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
