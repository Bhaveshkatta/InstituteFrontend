import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { InputFieldComponent } from '../../../shared/input-field/input-field';
import { ButtonComponent } from '../../../shared/button/button';
import { CardWrapperComponent } from '../../../shared/card-wrapper/card-wrapper';
import { LoadingIndicatorComponent } from '../../../shared/loading-indicator/loading-indicator';
import { AuthService } from '../../../services/auth.service';
import { StudentSidebarComponent } from '../../../shared/student-sidebar/student-sidebar';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    InputFieldComponent,
    ButtonComponent,
    CardWrapperComponent,
    RouterLink,
    StudentSidebarComponent
  ],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss'
})
export class StudentProfile implements OnInit {
  private readonly authService = inject(AuthService);

  isLoading = signal<boolean>(false);
  saveSuccess = signal<boolean>(false);
  sidebarOpen = signal<boolean>(false);

  // Student Profile Data
  studentData = signal({
    fullName: 'Rahul Gupta',
    email: 'rahul.gupta@example.com',
    phone: '9876543210',
    dob: '2002-05-14',
    gender: 'Male',
    studentId: 'KC-2024-0412',
    enrolledCourse: 'web-dev',
    registrationDate: '15 Jan 2024',
    attendanceRate: '87%',
    address: '124, Station Road, Near Central Bank',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001'
  });

  avatarInitials = computed(() =>
    this.studentData().fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  );

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];

  courseOptions = [
    { label: 'Full Stack Web Development', value: 'web-dev' },
    { label: 'Cyber Security & Ethical Hacking', value: 'cyber-sec' },
    { label: 'Tally Prime with GST & Tax', value: 'tally-gst' },
    { label: 'CCC & NIELIT O-Level', value: 'ccc-olevel' }
  ];

  profileForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
  });

  securityForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    const data = this.studentData();
    this.profileForm.patchValue({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode
    });
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  onSaveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
      this.saveSuccess.set(true);

      const val = this.profileForm.value;
      this.studentData.update(prev => ({
        ...prev,
        fullName: val.fullName || prev.fullName,
        email: val.email || prev.email,
        phone: val.phone || prev.phone,
        dob: val.dob || prev.dob,
        gender: val.gender || prev.gender,
        address: val.address || prev.address,
        city: val.city || prev.city,
        state: val.state || prev.state,
        pincode: val.pincode || prev.pincode
      }));

      setTimeout(() => {
        this.saveSuccess.set(false);
      }, 3000);
    }, 1200);
  }

  onUpdatePassword(): void {
    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.saveSuccess.set(true);
      this.securityForm.reset();
      setTimeout(() => this.saveSuccess.set(false), 3000);
    }, 1200);
  }

  logout() {
    this.authService.logout();
  }
}
