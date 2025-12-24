
import React, { useState } from 'react';
import { Contact } from '../types';

interface ContactListProps {
  t: any;
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactList: React.FC<ContactListProps> = ({ t, contacts, setContacts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSync = () => {
    // Mocking a sync from phone agenda
    const mockContacts: Contact[] = [
      { id: '1', name: 'Maria Silva', phone: '+55 11 98765-4321', isAllowed: true },
      { id: '2', name: 'João Oliveira', phone: '+55 11 91234-5678', isAllowed: true },
      { id: '3', name: 'Ana Costa', phone: '+55 11 93322-1100', isAllowed: true },
      { id: '4', name: 'Carlos Santos', phone: '+55 11 95544-3322', isAllowed: false },
      { id: '5', name: 'Dra. Beatriz', phone: '+55 11 94444-5555', isAllowed: true },
    ];
    setContacts(mockContacts);
  };

  const toggleContact = (id: string) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, isAllowed: !c.isAllowed } : c));
  };

  const toggleAll = () => {
    const anyDisabled = contacts.some(c => !c.isAllowed);
    setContacts(prev => prev.map(c => ({ ...c, isAllowed: anyDisabled })));
  };

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">{t.contacts}</h2>
        <button 
          onClick={handleSync}
          className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          {t.syncContacts}
        </button>
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {contacts.length > 0 ? (
        <>
          <div className="flex justify-end">
            <button onClick={toggleAll} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors">
              {t.toggleAll}
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map(contact => (
              <div key={contact.id} className="p-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary font-bold text-lg">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{contact.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{contact.phone}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={contact.isAllowed}
                    onChange={() => toggleContact(contact.id)}
                  />
                  <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="py-20 text-center flex flex-col items-center opacity-60">
          <svg className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p className="text-slate-500">{t.noContacts}</p>
        </div>
      )}
    </div>
  );
};

export default ContactList;
