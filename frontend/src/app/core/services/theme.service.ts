import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Signal para el modo actual ('light' | 'dark')
  darkMode = signal<boolean>(false);

  constructor() {
    if (this.isBrowser) {
      // 1. Comprobar si hay preferencia guardada en localStorage
      const savedTheme = localStorage.getItem('vintod-theme') as ThemeMode | null;
      if (savedTheme) {
        this.darkMode.set(savedTheme === 'dark');
      } else {
        // 2. Comprobar preferencia del sistema operativo
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.darkMode.set(prefersDark);
      }

      // 3. Efecto reactivo para actualizar la clase 'dark' en el <html> y sincronizar con localStorage
      effect(() => {
        const isDark = this.darkMode();
        if (isDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('vintod-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('vintod-theme', 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    this.darkMode.update(curr => !curr);
  }

  setTheme(mode: ThemeMode): void {
    this.darkMode.set(mode === 'dark');
  }
}
