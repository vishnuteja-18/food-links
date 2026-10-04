import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function AuthPage() {
  const { loginAs, showToast } = useApp();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('provider');
  const [regOrg, setRegOrg] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    // Auto-detect role from email or default to provider
    let role = 'provider';
    if (loginEmail.includes('ngo') || loginEmail.includes('shelter')) role = 'ngo';
    else if (loginEmail.includes('driver') || loginEmail.includes('volunteer')) role = 'volunteer';
    else if (loginEmail.includes('admin')) role = 'admin';

    showToast(`Welcome back! Logged in as ${role.toUpperCase()}`, 'success');
    loginAs(role);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regOrg) {
      showToast('Please fill in all required registration fields.', 'error');
      return;
    }
    if (!termsAgreed) {
      showToast('Please agree to Food Safety and Platform Terms.', 'warning');
      return;
    }
    showToast(`🎉 Registration successful for ${regOrg}!`, 'success');
    loginAs(regRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-8 relative overflow-hidden">
        
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 items-center justify-center text-white font-bold text-2xl shadow-md shadow-brand-700/20 mb-1">
            🌱
          </div>
          <h2 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            {tab === 'login' ? 'Welcome to FoodConnect AI' : 'Join the Zero-Waste Movement'}
          </h2>
          <p className="text-xs text-slate-500">
            {tab === 'login' ? 'Sign in to access your donation portal' : 'Register your restaurant, shelter or volunteer account'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              tab === 'login' ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              tab === 'register' ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1-Click Fast Persona Demo Logins */}
        <div className="mb-6 p-3 bg-brand-50/70 rounded-2xl border border-brand-200/80">
          <p className="text-[11px] font-bold text-brand-900 mb-2 flex items-center gap-1.5">
            <span>⚡ Quick 1-Click Demo Logins:</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => loginAs('provider')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left flex items-center gap-1.5"
            >
              <span>🍽️ Provider</span>
            </button>
            <button
              type="button"
              onClick={() => loginAs('ngo')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left flex items-center gap-1.5"
            >
              <span>🏢 NGO / Shelter</span>
            </button>
            <button
              type="button"
              onClick={() => loginAs('volunteer')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left flex items-center gap-1.5"
            >
              <span>🚚 Volunteer</span>
            </button>
            <button
              type="button"
              onClick={() => loginAs('admin')}
              className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-brand-100 text-[11px] font-semibold text-slate-800 border border-brand-200 transition text-left flex items-center gap-1.5"
            >
              <span>🛡️ City Admin</span>
            </button>
          </div>
        </div>

        {/* Forms */}
        {tab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="name@organization.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => showToast('Password reset link sent to email.', 'info')}
                  className="text-[11px] text-brand-700 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-600">
                Keep me signed in on this device
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-md shadow-brand-700/20 transition active:scale-95"
            >
              Sign In to FoodConnect
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Account Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRegRole('provider')}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition ${
                    regRole === 'provider' ? 'bg-brand-50 border-brand-500 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  🍽️ Provider
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole('ngo')}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition ${
                    regRole === 'ngo' ? 'bg-brand-50 border-brand-500 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  🏢 NGO
                </button>
                <button
                  type="button"
                  onClick={() => setRegRole('volunteer')}
                  className={`py-2 text-[11px] font-bold rounded-lg border text-center transition ${
                    regRole === 'volunteer' ? 'bg-brand-50 border-brand-500 text-brand-800' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  🚚 Courier
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Organization</label>
                <input
                  type="text"
                  required
                  value={regOrg}
                  onChange={(e) => setRegOrg(e.target.value)}
                  placeholder="e.g. Harvest Bistro"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Work Email</label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="contact@organization.org"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Create secure password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div className="flex items-start pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="terms" className="ml-2 text-[11px] text-slate-600 leading-tight">
                I agree to the FoodConnect Safe Food Handling Standards & Good Samaritan terms.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow transition active:scale-95 mt-2"
            >
              Create Account & Verify
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
