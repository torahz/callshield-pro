
import React from 'react';
import { AppSettings } from '../types';

interface PermissionsModalProps {
  t: any;
  permissions: AppSettings['permissionsGranted'];
  onGrant: (key: keyof AppSettings['permissionsGranted']) => void;
  onClose: () => void;
}

const PermissionsModal: React.FC<PermissionsModalProps> = ({ t, permissions, onGrant, onClose }) => {
  const allGranted = Object.values(permissions).every(v => v === true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-primary p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-bold">{t.permissionsTitle}</h2>
        </div>
        
        <div className="p-8 space-y-4">
          <PermissionItem 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
            label={t.permissionContacts}
            granted={permissions.contacts}
            onClick={() => onGrant('contacts')}
            t={t}
          />
          <PermissionItem 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
            label={t.permissionPhone}
            granted={permissions.phone}
            onClick={() => onGrant('phone')}
            t={t}
          />
          <PermissionItem 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            label={t.permissionBackground}
            granted={permissions.background}
            onClick={() => onGrant('background')}
            t={t}
          />
          <PermissionItem 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            label={t.permissionBattery}
            granted={permissions.battery}
            onClick={() => onGrant('battery')}
            t={t}
          />

          <button 
            disabled={!allGranted}
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg mt-4 ${allGranted ? 'bg-primary text-white active:scale-95' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}
          >
            {allGranted ? t.save : t.appName}
          </button>
        </div>
      </div>
    </div>
  );
};

const PermissionItem: React.FC<{ icon: React.ReactNode; label: string; granted: boolean; onClick: () => void; t: any }> = ({ icon, label, granted, onClick, t }) => (
  <div className="flex items-center justify-between p-1">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${granted ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
        {icon}
      </div>
      <span className={`text-sm font-semibold transition-colors ${granted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>{label}</span>
    </div>
    {granted ? (
      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t.granted}</span>
    ) : (
      <button 
        onClick={onClick}
        className="text-[10px] font-bold text-primary border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
      >
        {t.grant}
      </button>
    )}
  </div>
);

export default PermissionsModal;
