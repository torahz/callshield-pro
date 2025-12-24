
import React, { useState } from 'react';
import { AppSettings } from '../types';

interface SettingsViewProps {
  t: any;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

const SettingsView: React.FC<SettingsViewProps> = ({ t, settings, setSettings }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSimulateDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(settings.language === 'pt' 
        ? "Simulação: O código fonte está pronto. Para gerar um APK real, este projeto deve ser compilado usando Android Studio com Capacitor/Cordova." 
        : "Simulation: Source code is ready. To generate a real APK, this project must be compiled using Android Studio with Capacitor/Cordova.");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom duration-300">
      <h2 className="text-xl font-bold">{t.settings}</h2>

      {/* DND Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">{t.dndTitle}</h3>
                <p className="text-xs text-slate-400">{t.dndDescription}</p>
             </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={settings.dndEnabled}
              onChange={() => setSettings(p => ({ ...p, dndEnabled: !p.dndEnabled }))}
            />
            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {settings.dndEnabled && (
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.startTime}</label>
              <input 
                type="time" 
                value={settings.dndStartTime}
                onChange={(e) => setSettings(p => ({ ...p, dndStartTime: e.target.value }))}
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t.endTime}</label>
              <input 
                type="time" 
                value={settings.dndEndTime}
                onChange={(e) => setSettings(p => ({ ...p, dndEndTime: e.target.value }))}
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        )}
      </section>

      {/* APK / Build Info Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">{t.buildInfo}</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">{t.apkVersion}</span>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs text-primary">v2.4.1-stable</span>
          </div>
          <button 
            onClick={handleSimulateDownload}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white dark:text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t.generating}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                {t.downloadApk}
              </>
            )}
          </button>
        </div>
      </section>

      {/* App Info / System */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 shadow-sm">
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
           <span className="text-sm font-medium">Suporte</span>
           <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </div>
        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
           <span className="text-sm font-medium">Política de Privacidade</span>
           <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </div>
      </section>

      <div className="p-10 flex flex-col items-center justify-center text-center opacity-40">
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl rotate-12 flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest">{t.appName} &copy; 2024</p>
      </div>
    </div>
  );
};

export default SettingsView;
