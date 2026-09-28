'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const TelegramContext = createContext({
  isTma: false,
  isSimulatorMode: false,
  setSimulatorMode: () => {},
  tgUser: null,
  triggerHaptic: () => {},
  activeSurface: 'web',
  setActiveSurface: () => {}
});

export function TelegramWebAppProvider({ children }) {
  const [isTma, setIsTma] = useState(false);
  const [isSimulatorMode, setIsSimulatorMode] = useState(false);
  const [activeSurface, setActiveSurface] = useState('web');
  const [tgUser, setTgUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const wa = window.Telegram.WebApp;
      if (wa.initData && wa.initData.length > 0) {
        setIsTma(true);
        setActiveSurface('tma');
        wa.ready();
        wa.expand();
        try {
          wa.setHeaderColor('#09090b');
          wa.setBackgroundColor('#09090b');
        } catch {
          // ignore theme error on older webapp clients
        }
        if (wa.initDataUnsafe?.user) {
          setTgUser(wa.initDataUnsafe.user);
        }
      }
    }
  }, []);

  const triggerHaptic = (style = 'medium') => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
      try {
        if (style === 'success' || style === 'error' || style === 'warning') {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred(style);
        } else {
          window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
        }
      } catch {
        // haptic not supported
      }
    }
  };

  const handleSetSurface = (surface) => {
    triggerHaptic('light');
    setActiveSurface(surface);
    setIsSimulatorMode(surface === 'tma');
  };

  return (
    <TelegramContext.Provider
      value={{
        isTma,
        isSimulatorMode,
        setSimulatorMode: setIsSimulatorMode,
        tgUser,
        triggerHaptic,
        activeSurface,
        setActiveSurface: handleSetSurface
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegramWebApp() {
  return useContext(TelegramContext);
}
