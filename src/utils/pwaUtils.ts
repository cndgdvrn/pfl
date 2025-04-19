export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('Service Worker kaydedildi:', registration.scope);
        })
        .catch(function(error) {
          console.error('Service Worker kaydı başarısız oldu:', error);
        });
    });
  } else {
    console.log('Service Workers desteklenmiyor');
  }
}

export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(function(registration) {
        registration.unregister();
      })
      .catch(function(error) {
        console.error(error.message);
      });
  }
}

// PWA yükleme durumu kontrol
export function isPWAInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // iOS için standalone modunu kontrol et
  const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
  
  // iOS Safari için
  const isInIOSStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone === true;
  
  return isInStandaloneMode || isInIOSStandaloneMode;
}

// PWA yükleme prompt etkinliğini yakalama ve saklama
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

export function captureInstallPrompt() {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Tarayıcının default prompt'unu engelle
      e.preventDefault();
      // BeforeInstallPromptEvent'i sakla
      deferredPrompt = e as BeforeInstallPromptEvent;
    });
  }
}

export function showInstallPrompt(): Promise<boolean> | null {
  if (!deferredPrompt) {
    return null;
  }
  
  // Yükleme prompt'unu göster
  return deferredPrompt.prompt()
    .then(() => {
      // Kullanıcının cevabını bekle
      return deferredPrompt!.userChoice.then((choiceResult) => {
        // Prompt kullanıldı, artık tekrar kullanılamaz
        deferredPrompt = null;
        // Yüklendi mi?
        return choiceResult.outcome === 'accepted';
      });
    });
} 