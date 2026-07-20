import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

// Shared Components
import { NavbarComponent } from '../../shared/navbar/navbar';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner';
import { StatisticCardComponent } from '../../shared/statistic-card/statistic-card';
import { CourseCardComponent } from '../../shared/course-card/course-card';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card';
import { TestimonialCardComponent } from '../../shared/testimonial-card/testimonial-card';
import { GalleryCardComponent } from '../../shared/gallery-card/gallery-card';
import { FAQItemComponent } from '../../shared/faq-item/faq-item';
import { ContactCardComponent } from '../../shared/contact-card/contact-card';
import { FooterComponent } from '../../shared/footer/footer';
import { SectionTitleComponent } from '../../shared/section-title/section-title';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NavbarComponent,
    HeroBannerComponent,
    StatisticCardComponent,
    CourseCardComponent,
    FeatureCardComponent,
    TestimonialCardComponent,
    GalleryCardComponent,
    FAQItemComponent,
    ContactCardComponent,
    FooterComponent,
    SectionTitleComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly dataService = inject(DataService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Load signals from DataService
  statistics = this.dataService.getStatistics();
  features = this.dataService.getFeatures();
  courses = this.dataService.getCourses();
  testimonials = this.dataService.getTestimonials();
  faqs = this.dataService.getFAQs();
  galleryImages = this.dataService.getGalleryImages();

  // Mobile menu control state
  isSidenavOpen = signal(false);

  // Learning process steps data
  processSteps = [
    {
      step: '01',
      title: 'Choose & Attend Demo',
      description: 'Attend up to two free demo sessions in web dev, python, CCC, or tally to experience our lab and lecturing quality.',
      icon: 'search'
    },
    {
      step: '02',
      title: 'Hands-on Lectures',
      description: 'Join standard hourly classes covering detailed theory and daily practical templates on your own personal computer.',
      icon: 'school'
    },
    {
      step: '03',
      title: 'Mentored Practice',
      description: 'Spend time in our open lab (8am - 8pm) writing code or entries, backed by active, patient troubleshooting mentors.',
      icon: 'computer'
    },
    {
      step: '04',
      title: 'Build Projects',
      description: 'Work on comprehensive capstone tasks that cement theoretical concepts and build up a professional resume portfolio.',
      icon: 'dashboard'
    },
    {
      step: '05',
      title: 'Certification & Placement',
      description: 'Successfully pass mock exams to receive ISO registered certification and access placement interview invitations.',
      icon: 'workspace_premium'
    }
  ];

  toggleSidenav() {
    this.isSidenavOpen.update(val => !val);
  }

  scrollToSection(sectionId: string) {
    this.isSidenavOpen.set(false); // Close mobile sidenav if open
    
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

  handleEnrollClicked(course: any) {
    // If not logged in, redirect to login page
    if (!this.authService.isLoggedIn()()) {
      this.router.navigate(['/login']);
      return;
    }

    // Smooth scroll to the contact form to enroll
    this.scrollToSection('#contact');
    
    // Auto fill subject in contact form if active
    const subjectField = document.querySelector('[formcontrolname="subject"]') as HTMLInputElement;
    if (subjectField) {
      subjectField.value = `Inquiry regarding ${course.title}`;
      subjectField.dispatchEvent(new Event('input')); // Notify reactive forms
    }
  }
}
