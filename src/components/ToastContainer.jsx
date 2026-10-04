import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let bg = 'bg-slate-900 text-white border-slate-700';
        let icon = '⚡';

        if (toast.type === 'success') {
          bg = 'bg-brand-900/95 text-white border-brand-500/40 shadow-glow-green';
          icon = '✅';
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-900/95 text-white border-amber-500/40';
          icon = '⚠️';
        } else if (toast.type === 'error') {
          bg = 'bg-red-900/95 text-white border-red-500/40';
          icon = '❌';
        } else if (toast.type === 'info') {
          bg = 'bg-slate-900/95 text-white border-slate-600';
          icon = 'ℹ️';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 text-xs sm:text-sm font-medium animate-fadeIn`}
          >
            <span className="text-base flex-shrink-0">{icon}</span>
            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
