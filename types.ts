
export type Language = 'pt' | 'en';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  isAllowed: boolean;
  avatar?: string;
}

export interface BlockedCall {
  id: string;
  phoneNumber: string;
  timestamp: Date;
  reason: string;
}

export interface AppSettings {
  isBlockingEnabled: boolean;
  isDarkMode: boolean;
  language: Language;
  dndEnabled: boolean;
  dndStartTime: string;
  dndEndTime: string;
  permissionsGranted: {
    contacts: boolean;
    phone: boolean;
    background: boolean;
    battery: boolean;
  };
}
