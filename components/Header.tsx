
import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  t: any;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  lang: Language;
}

const Header: React.FC<HeaderProps> = ({ t, isDarkMode, onToggleTheme, onToggleLang, lang }) => {
  return (
    <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-xl">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">{t.appName}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleLang}
          className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase"
        >
          {lang}
        </button>
        <button 
          onClick={onToggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-transform active:scale-95"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
