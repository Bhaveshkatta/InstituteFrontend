import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { GovernmentCourseService } from '../../../services/government-course.service';
import { GovernmentScheme, GovernmentSchemeApplication } from '../../../models/government-scheme.model';
import { InputFieldComponent } from '../../../shared/input-field/input-field';
import { ButtonComponent } from '../../../shared/button/button';
import { CardWrapperComponent } from '../../../shared/card-wrapper/card-wrapper';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state';
import { AuthService } from '../../../services/auth.service';
import { StudentSidebarComponent } from '../../../shared/student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-government-courses',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    InputFieldComponent,
    ButtonComponent,
    CardWrapperComponent,
    RouterLink,
    StudentSidebarComponent
  ],
  templateUrl: './student-government-courses.html',
  styleUrl: './student-government-courses.scss'
})
export class StudentGovernmentCourses implements OnInit {
  private readonly govtService = inject(GovernmentCourseService);
  private readonly authService = inject(AuthService);

  schemes = this.govtService.getSchemes();
  myApplications = this.govtService.getUserApplications();

  selectedScheme = signal<GovernmentScheme | null>(null);
  currentStep = signal<'list' | 'details' | 'apply' | 'success'>('list');
  submittedApp = signal<GovernmentSchemeApplication | null>(null);
  isSubmitting = signal<boolean>(false);
  sidebarOpen = signal<boolean>(false);

  studentProfile = signal({
    fullName: 'Rahul Gupta',
    email: 'rahul.gupta@example.com',
    phone: '9876543210',
    studentId: 'KC-2024-0412',
    category: 'OBC',
    qualification: 'Graduate',
    address: '124, Station Road, Near Central Bank, Jaipur',
    pincode: '302001'
  });

  avatarInitials = computed(() =>
    this.studentProfile().fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  );

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
    const prof = this.studentProfile();
    this.appForm.patchValue({
      fullName: prof.fullName,
      email: prof.email,
      phone: prof.phone,
      studentId: prof.studentId,
      category: prof.category,
      qualification: prof.qualification,
      address: prof.address,
      pincode: prof.pincode
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  viewSchemeDetails(scheme: GovernmentScheme): void {
    this.selectedScheme.set(scheme);
    this.currentStep.set('details');
  }

  startApplication(scheme: GovernmentScheme): void {
    this.selectedScheme.set(scheme);
    this.currentStep.set('apply');
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
        studentId: val.studentId || this.studentProfile().studentId,
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
  }
}
