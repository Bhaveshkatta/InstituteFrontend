import { Component, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ ...MATERIAL_IMPORTS, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  hidePassword = signal(true);
  isLoading = signal(false);
  loginSuccess = signal(false);

  togglePassword() {
    this.hidePassword.update((val) => !val);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Simulate an API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.loginSuccess.set(true);
      
      this.authService.login();
      
      // Navigate to landing page after showing success state briefly
      setTimeout(() => {
        this.loginSuccess.set(false);
        this.router.navigate(['/student/dashboard']);
      }, 1500);
    }, 1500);
  }
}

