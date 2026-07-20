import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PrimaryButtonComponent } from '../primary-button/primary-button';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    PrimaryButtonComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './contact-card.html',
  styleUrl: './contact-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactCardComponent {
  private readonly snackBar = inject(MatSnackBar);

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl(''),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  isLoading = signal(false);

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    // Simulate API Submission
    setTimeout(() => {
      this.isLoading.set(false);
      this.snackBar.open('Thank you! Your message has been sent successfully.', 'Close', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['snackbar-success']
      });
      this.contactForm.reset();
    }, 2000);
  }
}
