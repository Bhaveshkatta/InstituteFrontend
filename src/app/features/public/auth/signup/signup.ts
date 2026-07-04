import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (!password || !confirmPassword) return null;
  
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-signup',
  imports: [ ...MATERIAL_IMPORTS, RouterLink ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignUp {
  signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
    agreeToTerms: new FormControl(false, [Validators.requiredTrue])
  }, { validators: passwordMatchValidator });

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  isLoading = signal(false);
  signupSuccess = signal(false);

  togglePassword() {
    this.hidePassword.update((val) => !val);
  }

  toggleConfirmPassword() {
    this.hideConfirmPassword.update((val) => !val);
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Simulate an API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.signupSuccess.set(true);
      
      // Auto-hide success state after 3 seconds
      setTimeout(() => {
        this.signupSuccess.set(false);
      }, 3000);
    }, 1500);
  }
}
