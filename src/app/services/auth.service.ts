import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedIn = signal<boolean>(this.checkLoginStatus());
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;
  private readonly controller = 'User';

  signup(data: FormData) {
    return this.http.post(
      `${this.baseUrl}/${this.controller}/signup`,
      data
    );
  }

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
