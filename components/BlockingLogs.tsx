
import React from 'react';
import { BlockedCall } from '../types';

interface BlockingLogsProps {
  t: any;
  logs: BlockedCall[];
  onClear: () => void;
}

const BlockingLogs: React.FC<BlockingLogsProps> = ({ t, logs, onClear }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-left duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.history}</h2>
        {logs.length > 0 && (
          <button 
            onClick={onClear}
            className="text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-wider"
          >
            Limpar
          </button>
        )}
      </div>

      {logs.length > 0 ? (
        <div className="space-y-4">
          {logs.map((log) => (
            <div key={log.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8l2-2m0 0l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">{log.phoneNumber}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {new Date(log.timestamp).toLocaleDateString()} - {new Date(log.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 px-2 py-1 rounded-md uppercase">Bloqueado</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center opacity-40 grayscale">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-sm font-medium">{t.noHistory}</p>
        </div>
      )}
    </div>
  );
};

export default BlockingLogs;
