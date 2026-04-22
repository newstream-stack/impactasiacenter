import React, { createContext, useContext, useState } from 'react';

import zhTranslations from './translations/zh.json';
import enTranslations from './translations/en.json';

const translations = {
  zh: zhTranslations,
  en: enTranslations
};

const I18nContext = createContext();

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh');

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
