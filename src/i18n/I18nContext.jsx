import React, { createContext, useContext, useState } from 'react';

const translations = {
  zh: {
    // Header
    navVision: '年會異象',
    navThemes: '專題研討',
    navVenue: '會場資訊',
    navSupport: '奉獻 Support',
    // Hero
    heroSubtitle: 'Phoenix, Arizona | Oct 2026',
    heroTitle: '曠野中的重生',
    heroEventName: 'IMPACT ASIA ALLIANCE SUMMIT',
    btnRegister: '立即報名',
    btnSupportOnline: '線上奉獻 Support',
  },
  en: {
    // Header
    navVision: 'Vision',
    navThemes: 'Themes',
    navVenue: 'Venue',
    navSupport: 'Support',
    // Hero
    heroSubtitle: 'Phoenix, Arizona | Oct 2026',
    heroTitle: 'Rebirth in the Wilderness',
    heroEventName: 'IMPACT ASIA ALLIANCE SUMMIT',
    btnRegister: 'Register Now',
    btnSupportOnline: 'Support Online',
  }
};

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh'); // default to zh

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  return (
    <I18nContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
