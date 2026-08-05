import { Component, signal, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { GovernmentCourseService } from '../../../services/government-course.service';
import { GovernmentScheme, GovernmentSchemeApplication } from '../../../models/government-scheme.model';
import { NavbarComponent } from '../../../shared/navbar/navbar';
import { FooterComponent } from '../../../shared/footer/footer';
import { InputFieldComponent } from '../../../shared/input-field/input-field';
import { ButtonComponent } from '../../../shared/button/button';
import { CardWrapperComponent } from '../../../shared/card-wrapper/card-wrapper';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state';

@Component({
  selector: 'app-public-government-courses',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    NavbarComponent,
    FooterComponent,
    InputFieldComponent,
    ButtonComponent,
    EmptyStateComponent
  ],
  templateUrl: './public-government-courses.html',
  styleUrl: './public-government-courses.scss'
})
export class PublicGovernmentCourses {
  private readonly govtService = inject(GovernmentCourseService);
  private readonly router = inject(Router);

  schemes = this.govtService.getSchemes();
  selectedScheme = signal<GovernmentScheme | null>(null);
  submittedApp = signal<GovernmentSchemeApplication | null>(null);
  isSubmitting = signal<boolean>(false);

  categoryOptions = [
    { label: 'General', value: 'General' },
    { label: 'OBC', value: 'OBC' },
    { label: 'SC', value: 'SC' },
    { label: 'ST', value: 'ST' },
    { label: 'EWS', value: 'EWS' }
  ];

  qualificationOptions = [
    { label: '10th Pass', value: '10th' },
    { label: '12th Pass', value: '12th' },
    { label: 'Diploma / ITI', value: 'Diploma' },
    { label: 'Graduate (BA/BSc/BCom/BCA/BTech)', value: 'Graduate' },
    { label: 'Post Graduate', value: 'PostGraduate' }
  ];

  interestForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    category: new FormControl('General', [Validators.required]),
    qualification: new FormControl('12th', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
  });

  openInterestModal(scheme: GovernmentScheme): void {
    this.selectedScheme.set(scheme);
    this.submittedApp.set(null);
  }

  closeModal(): void {
    this.selectedScheme.set(null);
    this.submittedApp.set(null);
    this.interestForm.reset({ category: 'General', qualification: '12th' });
  }

  onSubmitInterest(): void {
    const scheme = this.selectedScheme();
    if (!scheme) return;

    if (this.interestForm.invalid) {
      this.interestForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      const val = this.interestForm.value;

      const app = this.govtService.submitApplication({
        schemeId: scheme.id,
        schemeTitle: scheme.title,
        fullName: val.fullName!,
        email: val.email!,
        phone: val.phone!,
        category: val.category!,
        qualification: val.qualification!,
        address: val.address!,
        pincode: val.pincode!
      });

      this.submittedApp.set(app);
    }, 1200);
  }

  goToLoginToApply(): void {
    this.router.navigate(['/login']);
  }
}
