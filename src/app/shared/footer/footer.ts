import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PrimaryButtonComponent } from '../primary-button/primary-button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    MatSnackBarModule,
    PrimaryButtonComponent
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  currentYear = new Date().getFullYear();

  onSubscribe(emailInput: HTMLInputElement) {
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      this.snackBar.open('Please enter a valid email address.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }

    this.snackBar.open('Thank you for subscribing to our newsletter!', 'Close', {
      duration: 4000,
      panelClass: ['snackbar-success']
    });
    emailInput.value = '';
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();

    if (this.router.url.split('#')[0] !== '/' && this.router.url.split('#')[0] !== '/home') {
      this.router.navigate(['/home'], { fragment: sectionId.substring(1) });
      return;
    }

    const element = document.querySelector(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
