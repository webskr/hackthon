import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const SettingsContext = createContext({
  registrationOpen: true,
  pptSubmissionOpen: true,
  loadingSettings: true,
  toggleRegistration: async () => {},
  togglePptSubmission: async () => {}
});

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    registrationOpen: true,
    pptSubmissionOpen: true
  });
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'system_settings', 'portal');
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({
            registrationOpen: data.registrationOpen !== false,
            pptSubmissionOpen: data.pptSubmissionOpen !== false
          });
        } else {
          // Defaults if document doesn't exist yet
          setSettings({
            registrationOpen: true,
            pptSubmissionOpen: true
          });
        }
        setLoadingSettings(false);
      },
      (error) => {
        console.warn('System settings listener error, falling back to local defaults:', error);
        setLoadingSettings(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const toggleRegistration = async (newVal) => {
    const val = typeof newVal === 'boolean' ? newVal : !settings.registrationOpen;
    setSettings((prev) => ({ ...prev, registrationOpen: val }));
    try {
      await setDoc(doc(db, 'system_settings', 'portal'), { registrationOpen: val }, { merge: true });
    } catch (e) {
      console.error('Failed to update registration status in Firestore:', e);
      throw e;
    }
  };

  const togglePptSubmission = async (newVal) => {
    const val = typeof newVal === 'boolean' ? newVal : !settings.pptSubmissionOpen;
    setSettings((prev) => ({ ...prev, pptSubmissionOpen: val }));
    try {
      await setDoc(doc(db, 'system_settings', 'portal'), { pptSubmissionOpen: val }, { merge: true });
    } catch (e) {
      console.error('Failed to update PPT submission status in Firestore:', e);
      throw e;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        registrationOpen: settings.registrationOpen,
        pptSubmissionOpen: settings.pptSubmissionOpen,
        loadingSettings,
        toggleRegistration,
        togglePptSubmission
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function usePortalSettings() {
  return useContext(SettingsContext);
}
