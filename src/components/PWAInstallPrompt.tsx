'use client';

import { useState, useEffect } from 'react';
import { isPWAInstalled, showInstallPrompt, captureInstallPrompt } from '@/utils/pwaUtils';

type InstallStatus = 'unknown' | 'installed' | 'installable' | 'not-installable';

export default function PWAInstallPrompt() {
  const [installStatus, setInstallStatus] = useState<InstallStatus>('unknown');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Prompt yakalayıcıyı başlat
    captureInstallPrompt();
    
    // Yükleme durumunu kontrol et
    if (isPWAInstalled()) {
      setInstallStatus('installed');
    } 
    
    // beforeinstallprompt olayını dinle - bu PWA kurulabilir olduğunda tetiklenir
    const handleBeforeInstallPrompt = () => {
      setInstallStatus('installable');
      // 3 saniye sonra bildirim göster
      setTimeout(() => setShowPrompt(true), 3000);
    };
    
    // appinstalled olayını dinle
    const handleAppInstalled = () => {
      setInstallStatus('installed');
      setShowPrompt(false);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const wasInstalled = await showInstallPrompt();
    if (wasInstalled) {
      setInstallStatus('installed');
      setShowPrompt(false);
    }
  };

  // PWA bildirimini kapatma
  const handleClosePrompt = () => {
    setShowPrompt(false);
    // Bir süre sonra tekrar göstermek için durum kaydet
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  // Uygulama yüklüyse veya gösterilecek durum yoksa
  if (installStatus === 'installed' || installStatus === 'not-installable' || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 flex justify-between items-center">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white">Bu Uygulamayı Yükle</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">Ana ekranda daha hızlı erişin</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={handleClosePrompt}
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
        >
          Kapat
        </button>
        <button 
          onClick={handleInstallClick}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md"
        >
          Yükle
        </button>
      </div>
    </div>
  );
} 