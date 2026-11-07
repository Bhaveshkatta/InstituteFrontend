import { Injectable, signal } from '@angular/core';

export type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  currentTheme = signal<ThemeMode>('dark');

  constructor() {
    const initial = this.getInitialTheme();
    this.setTheme(initial);
  }

  toggleTheme(): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kc_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('light-theme');
        document.body.classList.add('light-theme');
      } else {
        document.documentElement.classList.remove('light-theme');
        document.body.classList.remove('light-theme');
      }
    }
  }

  isDark(): boolean {
    return this.currentTheme() === 'dark';
  }

  private getInitialTheme(): ThemeMode {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('kc_theme') as ThemeMode;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark';
  }
}
