import { Component, output, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    SecondaryButtonComponent
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);

  isLoggedIn = this.authService.isLoggedIn();
  menuToggled = output<void>();

  navLinks = [
    { label: 'Home', path: '#home' },
    { label: 'Courses', path: '#courses' },
    { label: 'Why Choose Us', path: '#about' },
    { label: 'Process', path: '#process' },
    { label: 'Gallery', path: '#gallery' },
    { label: 'FAQ', path: '#faq' },
    { label: 'Contact', path: '#contact' }
  ];

  toggleMenu() {
    this.menuToggled.emit();
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    
    // If we're not on the home page, route to home first
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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
