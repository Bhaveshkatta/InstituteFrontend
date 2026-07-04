import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';

@Component({
  selector: 'app-login',
  imports: [ ...MATERIAL_IMPORTS, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
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
      
      // Auto-hide success state after 3 seconds
      setTimeout(() => {
        this.loginSuccess.set(false);
      }, 3000);
    }, 1500);
  }
}
