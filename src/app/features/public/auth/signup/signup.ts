import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';
import { buildFormData } from '../../../../shared/utils/form-data.util';
import { AuthService } from '../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

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

    const formVal = this.signupForm.getRawValue();

    const data = buildFormData(formVal);

    this.isLoading.set(true);

    // Simulate an API call
    // setTimeout(() => {
    //   this.isLoading.set(false);
    //   this.signupSuccess.set(true);
      
    //   // Auto-hide success state after 3 seconds
    //   setTimeout(() => {
    //     this.signupSuccess.set(false);
    //   }, 3000);
    // }, 1500);

     this.authService.signup(data).subscribe({

      next: (response: any) => {

        this.isLoading.set(false);
         console.log("Response: ", response);
        if (response.Success) {
          this.signupSuccess.set(true);
          this.toastr.success(
            'Account created successfully!',
            'Success'
          );
           // Redirect to login after successful signup
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(
            'Something went wrong. Please try again.',
            'Error'
          );
          console.error('Signup failed:', response.Message);
        }
      },

      error: (error: any) => {

        this.isLoading.set(false);

        console.error('Signup failed:', error);

        if (error.status === 409) {

          this.toastr.error(
            error.error?.Message ?? 'Email is already registered.',
            'Signup Failed'
          );

          return;
        }

         this.toastr.error(
          'Something went wrong. Please try again.',
          'Error'
        );
      }

    });
  }
}
