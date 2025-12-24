
import React, { useState, useEffect } from 'react';
import { AppSettings, Contact, BlockedCall, Language } from './types';
import { translations } from './i18n';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ContactList from './components/ContactList';
import BlockingLogs from './components/BlockingLogs';
import SettingsView from './components/SettingsView';
import PermissionsModal from './components/PermissionsModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contacts' | 'history' | 'settings'>('dashboard');
  const [showPermissions, setShowPermissions] = useState(false);
  
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('callshield_settings');
    if (saved) return JSON.parse(saved);
    return {
      isBlockingEnabled: false,
      isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      language: (navigator.language.startsWith('pt') ? 'pt' : 'en') as Language,
      dndEnabled: false,
      dndStartTime: '22:00',
      dndEndTime: '07:00',
      permissionsGranted: {
        contacts: false,
        phone: false,
        background: false,
        battery: false,
      }
    };
  });

  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('callshield_contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState<BlockedCall[]>(() => {
    const saved = localStorage.getItem('callshield_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const t = translations[settings.language];

  useEffect(() => {
    localStorage.setItem('callshield_settings', JSON.stringify(settings));
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('callshield_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('callshield_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    const allGranted = Object.values(settings.permissionsGranted).every(v => v === true);
    if (!allGranted) {
      setShowPermissions(true);
    }
  }, []);

  const handleToggleBlocking = () => {
    setSettings(prev => ({ ...prev, isBlockingEnabled: !prev.isBlockingEnabled }));
  };

  const handleGrantPermission = (key: keyof AppSettings['permissionsGranted']) => {
    setSettings(prev => ({
      ...prev,
      permissionsGranted: {
        ...prev.permissionsGranted,
        [key]: true
      }
    }));
  };

  const addMockLog = () => {
    const newLog: BlockedCall = {
      id: Math.random().toString(36).substr(2, 9),
      phoneNumber: `+55 (11) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date(),
      reason: 'Not in whitelist'
    };
    setLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-slate-50 dark:bg-slate-950 border-x border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      <Header 
        t={t} 
        isDarkMode={settings.isDarkMode} 
        onToggleTheme={() => setSettings(p => ({ ...p, isDarkMode: !p.isDarkMode }))} 
        onToggleLang={() => setSettings(p => ({ ...p, language: p.language === 'pt' ? 'en' : 'pt' }))}
        lang={settings.language}
      />

      <main className="flex-1 overflow-y-auto pb-24 px-4 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard 
            t={t} 
            settings={settings} 
            onToggleBlocking={handleToggleBlocking} 
            recentLogs={logs.slice(0, 3)}
            onAddMockLog={addMockLog}
          />
        )}
        {activeTab === 'contacts' && (
          <ContactList 
            t={t} 
            contacts={contacts} 
            setContacts={setContacts} 
          />
        )}
        {activeTab === 'history' && (
          <BlockingLogs 
            t={t} 
            logs={logs} 
            onClear={() => setLogs([])} 
          />
        )}
        {activeTab === 'settings' && (
          <SettingsView 
            t={t} 
            settings={settings} 
            setSettings={setSettings} 
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 flex justify-around py-4 px-2 z-40">
        <NavButton 
          active={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
          label={t.dashboard}
        />
        <NavButton 
          active={activeTab === 'contacts'} 
          onClick={() => setActiveTab('contacts')} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          label={t.contacts}
        />
        <NavButton 
          active={activeTab === 'history'} 
          onClick={() => setActiveTab('history')} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          label={t.history}
        />
        <NavButton 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')} 
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
          label={t.settings}
        />
      </nav>

      {showPermissions && (
        <PermissionsModal 
          t={t} 
          permissions={settings.permissionsGranted} 
          onGrant={handleGrantPermission} 
          onClose={() => setShowPermissions(false)}
        />
      )}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-primary scale-110' : 'text-slate-400 opacity-60'}`}
  >
    <div className={`p-1 rounded-lg transition-colors ${active ? 'bg-primary/10' : ''}`}>
      {icon}
    </div>
    <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;
