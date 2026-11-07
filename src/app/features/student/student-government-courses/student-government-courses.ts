import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { GovernmentCourseService } from '../../../services/government-course.service';
import { GovernmentScheme, GovernmentSchemeApplication } from '../../../models/government-scheme.model';
import { InputFieldComponent } from '../../../shared/input-field/input-field';
import { ButtonComponent } from '../../../shared/button/button';
import { CardWrapperComponent } from '../../../shared/card-wrapper/card-wrapper';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
import { ThemeService } from '../../../services/theme.service';
import { StudentShellComponent } from '../../../shared/student-shell/student-shell';

@Component({
  selector: 'app-student-government-courses',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    InputFieldComponent,
    ButtonComponent,
    CardWrapperComponent,
    StudentShellComponent
  ],
  templateUrl: './student-government-courses.html',
  styleUrl: './student-government-courses.scss'
})
export class StudentGovernmentCourses implements OnInit {
  private readonly govtService = inject(GovernmentCourseService);
  private readonly authService = inject(AuthService);
  private readonly profileService = inject(ProfileService);
  protected readonly themeService = inject(ThemeService);
  protected readonly router = inject(Router);

  schemes = this.govtService.getSchemes();
  myApplications = this.govtService.getUserApplications();

  selectedScheme = signal<GovernmentScheme | null>(null);
  currentStep = signal<'list' | 'details' | 'apply' | 'success'>('list');
  submittedApp = signal<GovernmentSchemeApplication | null>(null);
  isSubmitting = signal<boolean>(false);
  notificationFeedback = signal<string | null>(null);

  studentProfile = computed(() => this.profileService.candidateProfile());

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

  appForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    studentId: new FormControl({ value: '', disabled: true }),
    category: new FormControl('OBC', [Validators.required]),
    qualification: new FormControl('Graduate', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
  });

  ngOnInit(): void {
    const prof = this.profileService.candidateProfile();
    this.appForm.patchValue({
      fullName: prof.fullName,
      email: prof.email,
      phone: prof.phone,
      studentId: prof.studentId,
      category: prof.category,
      qualification: prof.graduation.stream || 'Graduate',
      address: prof.address,
      pincode: prof.pincode
    });
  }

  viewSchemeDetails(scheme: GovernmentScheme): void {
    this.selectedScheme.set(scheme);
    this.currentStep.set('details');
  }

  startApplication(scheme: GovernmentScheme): void {
    this.profileService.checkProfileAndProceed(
      this.router,
      () => {
        this.selectedScheme.set(scheme);
        this.currentStep.set('apply');
      },
      (msg) => {
        this.showToast(msg);
      }
    );
  }

  showToast(msg: string) {
    this.notificationFeedback.set(msg);
    setTimeout(() => {
      this.notificationFeedback.set(null);
    }, 4000);
  }

  backToList(): void {
    this.selectedScheme.set(null);
    this.currentStep.set('list');
  }

  onSubmitApplication(): void {
    const scheme = this.selectedScheme();
    if (!scheme) return;

    if (this.appForm.invalid) {
      this.appForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      const val = this.appForm.getRawValue();

      const app = this.govtService.submitApplication({
        schemeId: scheme.id,
        schemeTitle: scheme.title,
        fullName: val.fullName!,
        email: val.email!,
        phone: val.phone!,
        studentId: val.studentId || this.profileService.candidateProfile().studentId,
        category: val.category!,
        qualification: val.qualification!,
        address: val.address!,
        pincode: val.pincode!
      });

      this.submittedApp.set(app);
      this.currentStep.set('success');
    }, 1200);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
