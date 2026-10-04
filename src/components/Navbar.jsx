import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function Navbar() {
  const { 
    currentPage, 
    setCurrentPage, 
    currentRole, 
    switchRole, 
    currentUser, 
    notifications,
    setNotifications 
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top Impact Banner */}
      <div className="bg-brand-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand-500/30 text-brand-100 border border-brand-400/30 text-[11px] font-semibold">
          ⚡ Live AI Redistribution
        </span>
        <span>Over <strong>148,920 kg</strong> of surplus food redirected to 140+ verified community shelters.</span>
        <button 
          onClick={() => setCurrentPage('impact-analytics')}
          className="underline hover:text-brand-200 font-bold ml-1 transition"
        >
          View Live Metrics &rarr;
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 flex items-center justify-center shadow-md shadow-brand-700/20 group-hover:scale-105 transition">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 7v5l3 3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M8 12h8" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900">
                  Food<span className="text-brand-700">Connect</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-100 text-brand-800 rounded border border-brand-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none font-medium">Surplus Food Rescue</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentPage('landing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'landing' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentPage('provider-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'provider-dashboard' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Provider Portal
            </button>

            <button
              onClick={() => setCurrentPage('ngo-marketplace')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'ngo-marketplace' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Discover Food
            </button>

            <button
              onClick={() => setCurrentPage('live-tracking')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'live-tracking' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Live Tracking
            </button>

            <button
              onClick={() => setCurrentPage('impact-analytics')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'impact-analytics' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Impact Hub
            </button>

            <button
              onClick={() => setCurrentPage('volunteer-portal')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                currentPage === 'volunteer-portal' ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Volunteers
            </button>
          </nav>

          {/* Right Action Bar (Role Switcher, Notifications, User) */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Demo Role Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition"
                title="Switch persona to test features"
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="capitalize">{currentRole} Mode</span>
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Test As Role</p>
                  </div>
                  <button
                    onClick={() => { switchRole('provider'); setCurrentPage('provider-dashboard'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🍽️ <strong>Food Provider</strong> (Restaurant)</span>
                    {currentRole === 'provider' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('ngo'); setCurrentPage('ngo-marketplace'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🏢 <strong>NGO / Shelter</strong> (Recipient)</span>
                    {currentRole === 'ngo' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('volunteer'); setCurrentPage('volunteer-portal'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🚚 <strong>Volunteer Courier</strong> (Driver)</span>
                    {currentRole === 'volunteer' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setCurrentPage('admin-portal'); setShowRoleDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-brand-50 flex items-center justify-between text-slate-700"
                  >
                    <span>🛡️ <strong>Platform Admin</strong> (City Hub)</span>
                    {currentRole === 'admin' && <span className="text-brand-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                aria-label="View notifications"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">Notifications</span>
                      <span className="text-xs bg-brand-100 text-brand-800 px-2 py-0.5 rounded-full font-semibold">
                        {unreadCount} new
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllRead}
                        className="text-xs text-brand-700 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 px-2 py-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`p-2.5 rounded-xl transition ${n.read ? 'bg-white opacity-80' : 'bg-brand-50/60 font-medium'}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setCurrentPage('add-food')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold shadow-sm transition active:scale-95"
            >
              <span>+</span>
              <span>Donate Food</span>
            </button>

            {/* User Profile / Auth button */}
            <button
              onClick={() => setCurrentPage('auth')}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white transition"
            >
              <img 
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200'} 
                alt="Profile" 
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-xs font-medium text-slate-700 hidden lg:inline max-w-[100px] truncate">
                {currentUser?.name?.split(' ')[0] || 'Account'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => { setCurrentPage('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Home
          </button>
          <button
            onClick={() => { setCurrentPage('provider-dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Provider Dashboard
          </button>
          <button
            onClick={() => { setCurrentPage('add-food'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-brand-700 bg-brand-50"
          >
            + Add Surplus Food
          </button>
          <button
            onClick={() => { setCurrentPage('ngo-marketplace'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Discover Food (NGO)
          </button>
          <button
            onClick={() => { setCurrentPage('live-tracking'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Live Tracking
          </button>
          <button
            onClick={() => { setCurrentPage('impact-analytics'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Impact & CSR Hub
          </button>
          <button
            onClick={() => { setCurrentPage('volunteer-portal'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Volunteer Portal
          </button>
          <button
            onClick={() => { setCurrentPage('auth'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Sign In / Switch Accounts
          </button>
        </div>
      )}
    </header>
  );
}
