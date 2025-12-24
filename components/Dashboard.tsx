
import React, { useEffect, useState } from 'react';
import { AppSettings, BlockedCall } from '../types';
import { GoogleGenAI } from "@google/genai";

interface DashboardProps {
  t: any;
  settings: AppSettings;
  onToggleBlocking: () => void;
  recentLogs: BlockedCall[];
  onAddMockLog: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ t, settings, onToggleBlocking, recentLogs, onAddMockLog }) => {
  const [safetyTip, setSafetyTip] = useState<string>('');

  useEffect(() => {
    // Only fetch tip if online, otherwise use a fallback
    const fetchTip = async () => {
      if (!navigator.onLine) {
        setSafetyTip(settings.language === 'pt' ? 'Mantenha sua agenda atualizada para evitar bloqueios indevidos.' : 'Keep your contacts updated to avoid accidental blocks.');
        return;
      }
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Dê uma dica curta e técnica (máximo 120 caracteres) sobre bloqueio de chamadas spam. Responda em ${settings.language === 'pt' ? 'português' : 'inglês'}.`,
        });
        setSafetyTip(response.text || '');
      } catch (err) {
        setSafetyTip(settings.language === 'pt' ? 'Proteção local ativada contra fraudes.' : 'Local fraud protection enabled.');
      }
    };
    fetchTip();
  }, [settings.language]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Privacy Badge */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          {t.warningTitle}
        </div>
      </div>

      {/* Hero Control Card */}
      <div className={`p-8 rounded-[2.5rem] transition-all duration-700 relative overflow-hidden flex flex-col items-center text-center shadow-2xl ${settings.isBlockingEnabled ? 'bg-slate-900 text-white dark:bg-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        
        <div className={`mb-6 w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-700 transform ${settings.isBlockingEnabled ? 'bg-emerald-500 rotate-0 scale-110 shadow-emerald-500/50 shadow-lg' : 'bg-slate-300 dark:bg-slate-700 rotate-12 scale-100'}`}>
          {settings.isBlockingEnabled ? (
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          ) : (
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          )}
        </div>

        <h2 className="text-3xl font-black mb-1 tracking-tight">
          {settings.isBlockingEnabled ? t.active : t.inactive}
        </h2>
        <div className="flex items-center gap-2 mb-8">
           <div className={`w-2 h-2 rounded-full ${settings.isBlockingEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></div>
           <p className="text-[10px] opacity-70 font-bold uppercase tracking-[0.2em]">{t.blockingStatus}</p>
        </div>

        <button 
          onClick={onToggleBlocking}
          className={`w-full max-w-[200px] py-4 rounded-2xl font-black transition-all active:scale-95 shadow-xl uppercase tracking-widest text-xs ${settings.isBlockingEnabled ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-primary text-white hover:bg-blue-600'}`}
        >
          {settings.isBlockingEnabled ? 'Desativar' : 'Ativar Agora'}
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Whitelist</span>
          <span className="text-xl font-black text-primary">Local</span>
        </div>
        <button 
          onClick={onAddMockLog}
          className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase mb-2 group-hover:text-primary transition-colors">{t.simulateCall}</span>
          <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
        </button>
      </div>

      {/* Safety Tip (Gemini/Fallback) */}
      <div className="bg-slate-100 dark:bg-slate-800/50 p-5 rounded-3xl">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
          "{safetyTip}"
        </p>
      </div>

      {/* Recent History Preview */}
      <section>
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">{t.blockedCalls}</h3>
        </div>
        {recentLogs.length > 0 ? (
          <div className="space-y-3">
            {recentLogs.map(log => (
              <div key={log.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between animate-in slide-in-from-top duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-sm truncate">{log.phoneNumber}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Bloqueado Silenciosamente</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 py-8 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center text-center px-6">
            <svg className="w-8 h-8 text-slate-200 dark:text-slate-700 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{t.noHistory}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
