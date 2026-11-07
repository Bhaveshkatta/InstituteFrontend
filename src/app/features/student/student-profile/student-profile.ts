import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared.imports';
import { InputFieldComponent, SelectOption } from '../../../shared/input-field/input-field';
import { ButtonComponent } from '../../../shared/button/button';
import { CardWrapperComponent } from '../../../shared/card-wrapper/card-wrapper';
import { AuthService } from '../../../services/auth.service';
import { ProfileService, CandidateProfile } from '../../../services/profile.service';
import { StudentShellComponent } from '../../../shared/student-shell/student-shell';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    InputFieldComponent,
    ButtonComponent,
    CardWrapperComponent,
    StudentShellComponent
  ],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss'
})
export class StudentProfile implements OnInit {
  protected readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly profileService = inject(ProfileService);

  isLoading = signal<boolean>(false);
  saveSuccess = signal<boolean>(false);
  activeTab = signal<'basic' | 'address' | 'qualifications' | 'security'>('basic');

  avatarInitials = computed(() =>
    this.profileService.candidateProfile().fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  );

  // Dropdown options
  genderOptions: SelectOption[] = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' }
  ];

  maritalOptions: SelectOption[] = [
    { label: 'Single', value: 'Single' },
    { label: 'Married', value: 'Married' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Widowed', value: 'Widowed' }
  ];

  categoryOptions: SelectOption[] = [
    { label: 'General', value: 'General' },
    { label: 'OBC', value: 'OBC' },
    { label: 'SC', value: 'SC' },
    { label: 'ST', value: 'ST' },
    { label: 'EWS', value: 'EWS' }
  ];

  physicallyChallengedOptions: SelectOption[] = [
    { label: 'No', value: 'No' },
    { label: 'Yes', value: 'Yes' }
  ];

  mediumOptions: SelectOption[] = [
    { label: 'English', value: 'English' },
    { label: 'Hindi', value: 'Hindi' }
  ];

  // Forms
  basicForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    motherName: new FormControl('', [Validators.required]),
    fatherName: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('Male', [Validators.required]),
    maritalStatus: new FormControl('Single', [Validators.required]),
    category: new FormControl('General', [Validators.required]),
    physicallyChallenged: new FormControl('No', [Validators.required]),
    mediumOfStudy: new FormControl('English', [Validators.required]),
    aadharNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{12}$')]),
    panNo: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
  });

  addressForm = new FormGroup({
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
  });

  qualificationForm = new FormGroup({
    // 10th
    tenthBoard: new FormControl('', [Validators.required]),
    tenthPassingYear: new FormControl('', [Validators.required]),
    tenthStream: new FormControl('', [Validators.required]),
    tenthPercentage: new FormControl('', [Validators.required]),
    tenthGrade: new FormControl('', [Validators.required]),

    // 12th
    twelfthBoard: new FormControl('', [Validators.required]),
    twelfthPassingYear: new FormControl('', [Validators.required]),
    twelfthStream: new FormControl('', [Validators.required]),
    twelfthPercentage: new FormControl('', [Validators.required]),
    twelfthGrade: new FormControl('', [Validators.required]),

    // Graduation
    gradBoard: new FormControl(''),
    gradPassingYear: new FormControl(''),
    gradStream: new FormControl(''),
    gradPercentage: new FormControl(''),
    gradGrade: new FormControl('')
  });

  securityForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    const data = this.profileService.candidateProfile();
    
    // Patch basic form
    this.basicForm.patchValue({
      fullName: data.fullName,
      motherName: data.motherName,
      fatherName: data.fatherName,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.maritalStatus,
      category: data.category,
      physicallyChallenged: data.physicallyChallenged,
      mediumOfStudy: data.mediumOfStudy,
      aadharNo: data.aadharNo,
      panNo: data.panNo,
      email: data.email,
      phone: data.phone
    });

    // Patch address form
    this.addressForm.patchValue({
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode
    });

    // Patch qualification form
    this.qualificationForm.patchValue({
      tenthBoard: data.tenth.board,
      tenthPassingYear: data.tenth.passingYear,
      tenthStream: data.tenth.stream,
      tenthPercentage: data.tenth.percentage,
      tenthGrade: data.tenth.grade,

      twelfthBoard: data.twelfth.board,
      twelfthPassingYear: data.twelfth.passingYear,
      twelfthStream: data.twelfth.stream,
      twelfthPercentage: data.twelfth.percentage,
      twelfthGrade: data.twelfth.grade,

      gradBoard: data.graduation.board,
      gradPassingYear: data.graduation.passingYear,
      gradStream: data.graduation.stream,
      gradPercentage: data.graduation.percentage,
      gradGrade: data.graduation.grade
    });
  }

  setTab(tab: 'basic' | 'address' | 'qualifications' | 'security') {
    this.activeTab.set(tab);
  }

  onSaveBasicDetails(): void {
    if (this.basicForm.invalid) {
      this.basicForm.markAllAsTouched();
      return;
    }
    const val = this.basicForm.value;
    const cleanData: Partial<CandidateProfile> = {
      ...(val.fullName ? { fullName: val.fullName } : {}),
      ...(val.motherName ? { motherName: val.motherName } : {}),
      ...(val.fatherName ? { fatherName: val.fatherName } : {}),
      ...(val.dob ? { dob: val.dob } : {}),
      ...(val.gender ? { gender: val.gender } : {}),
      ...(val.maritalStatus ? { maritalStatus: val.maritalStatus } : {}),
      ...(val.category ? { category: val.category } : {}),
      ...(val.physicallyChallenged ? { physicallyChallenged: val.physicallyChallenged } : {}),
      ...(val.mediumOfStudy ? { mediumOfStudy: val.mediumOfStudy } : {}),
      ...(val.aadharNo ? { aadharNo: val.aadharNo } : {}),
      ...(val.panNo ? { panNo: val.panNo } : {}),
      ...(val.email ? { email: val.email } : {}),
      ...(val.phone ? { phone: val.phone } : {})
    };
    this.saveData(cleanData);
  }

  onSaveAddressDetails(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    const val = this.addressForm.value;
    const cleanData: Partial<CandidateProfile> = {
      ...(val.address ? { address: val.address } : {}),
      ...(val.city ? { city: val.city } : {}),
      ...(val.state ? { state: val.state } : {}),
      ...(val.pincode ? { pincode: val.pincode } : {})
    };
    this.saveData(cleanData);
  }

  onSaveQualifications(): void {
    if (this.qualificationForm.invalid) {
      this.qualificationForm.markAllAsTouched();
      return;
    }
    const val = this.qualificationForm.value;
    const qualificationUpdate: Partial<CandidateProfile> = {
      tenth: {
        board: val.tenthBoard || '',
        passingYear: val.tenthPassingYear || '',
        stream: val.tenthStream || '',
        percentage: val.tenthPercentage || '',
        grade: val.tenthGrade || ''
      },
      twelfth: {
        board: val.twelfthBoard || '',
        passingYear: val.twelfthPassingYear || '',
        stream: val.twelfthStream || '',
        percentage: val.twelfthPercentage || '',
        grade: val.twelfthGrade || ''
      },
      graduation: {
        board: val.gradBoard || '',
        passingYear: val.gradPassingYear || '',
        stream: val.gradStream || '',
        percentage: val.gradPercentage || '',
        grade: val.gradGrade || ''
      }
    };

    this.saveData(qualificationUpdate);
  }

  private saveData(data: Partial<CandidateProfile>): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.profileService.updateProfile(data);
      this.saveSuccess.set(true);
      setTimeout(() => this.saveSuccess.set(false), 3500);
    }, 800);
  }

  onUpdatePassword(): void {
    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }

    const { newPassword, confirmPassword } = this.securityForm.value;
    if (newPassword !== confirmPassword) {
      this.securityForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      this.securityForm.get('confirmPassword')?.markAsTouched();
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.saveSuccess.set(true);
      this.securityForm.reset();
      setTimeout(() => this.saveSuccess.set(false), 3500);
    }, 1000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
