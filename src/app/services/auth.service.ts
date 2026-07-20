import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedIn = signal<boolean>(this.checkLoginStatus());

  isLoggedIn() {
    return this.loggedIn.asReadonly();
  }

  login() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLoggedIn', 'true');
    }
    this.loggedIn.set(true);
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('isLoggedIn');
    }
    this.loggedIn.set(false);
  }

  private checkLoginStatus(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }
}
