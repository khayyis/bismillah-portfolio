'use client';

import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext({
  showToast: () => {}
});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', duration = 2500) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-24 right-6 z-50 animate-toast">
          <div className="flex items-center gap-2.5 rounded-xl border border-zinc-700 bg-zinc-900/95 px-4 py-3 text-xs font-semibold text-white shadow-2xl backdrop-blur-md">
            {toast.type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
            {toast.type === 'info' && <Info className="h-4 w-4 text-blue-400" />}
            {toast.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-400" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
