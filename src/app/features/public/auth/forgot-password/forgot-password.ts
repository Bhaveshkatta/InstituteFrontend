import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/ui/material.imports';

@Component({
  selector: 'app-forgot-password',
  imports: [ ...MATERIAL_IMPORTS, RouterLink ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isLoading = signal(false);
  submitSuccess = signal(false);

  onSubmit() {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Simulate an API call
    setTimeout(() => {
      this.isLoading.set(false);
      this.submitSuccess.set(true);
    }, 1500);
  }
}
