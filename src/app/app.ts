import { Component, HostListener, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  deferredPrompt = signal<any>(null);
  showInstallPrompt = signal<boolean>(false);
  isIOS = signal<boolean>(false);

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    this.isIOS.set(isIOSDevice);

    // If iOS, show prompt after a short delay since beforeinstallprompt won't fire
    if (isIOSDevice && !localStorage.getItem('pwa-prompt-dismissed')) {
      setTimeout(() => {
        this.showInstallPrompt.set(true);
      }, 2000);
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt.set(e);
    
    // Show the prompt if it hasn't been dismissed
    if (!localStorage.getItem('pwa-prompt-dismissed')) {
      this.showInstallPrompt.set(true);
    }
  }

  installApp() {
    if (this.isIOS()) {
      // For iOS, we just show instructions (handled in template)
      return;
    }

    const promptEvent = this.deferredPrompt();
    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('pwa-prompt-dismissed', 'true');
        }
        this.deferredPrompt.set(null);
        this.showInstallPrompt.set(false);
      });
    }
  }

  dismissInstallPrompt() {
    this.showInstallPrompt.set(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }

  isNotLoginPage(): boolean {
    const hiddenRoutes = ['/login', '/register', '/add-property'];
    return !hiddenRoutes.includes(this.router.url);
  }
}
