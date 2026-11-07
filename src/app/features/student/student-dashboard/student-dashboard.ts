import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { ProfileService } from '../../../services/profile.service';
import { EmptyStateComponent } from '../../../shared/empty-state/empty-state';
import { ButtonComponent } from '../../../shared/button/button';
import { StudentSidebarComponent } from '../../../shared/student-sidebar/student-sidebar';

export interface CourseDetailItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  iconColor: string;
  progress: number;
  startDate: string;
  endDate: string;
  batchTiming: string;
  instructor: string;
  totalHours: number;
  completedHours: number;
  admitCardAvailable: boolean;
  certificateAvailable: boolean;
}

export interface StudentApplication {
  id: string;
  applicationName: string;
  appliedDate: string;
  status: 'Approved' | 'Pending Approval' | 'Under Review' | 'Action Required';
  remarks?: string;
  courseCategory: string;
}

export interface ScheduleItem {
  time: string;
  subject: string;
  instructor: string;
  room: string;
  type: 'class' | 'test' | 'lab';
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    EmptyStateComponent,
    ButtonComponent,
    StudentSidebarComponent
  ],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboard {
  protected readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly themeService = inject(ThemeService);
  protected readonly profileService = inject(ProfileService);

  studentName = computed(() => this.profileService.candidateProfile().fullName);
  studentId = computed(() => this.profileService.candidateProfile().studentId);

  avatarInitials = computed(() =>
    this.studentName()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  );

  today = signal(
    new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  // Statistics
  stats = signal([
    { label: 'Enrolled Courses', value: '3', icon: 'school', color: '#00e5ff', bg: 'rgba(0,229,255,0.08)' },
    { label: 'Attendance Rate', value: '87%', icon: 'fact_check', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
    { label: 'Applications', value: '3', icon: 'description', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    { label: 'Certificates', value: '1', icon: 'workspace_premium', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  ]);

  showEmptyState = signal(false);
  sidebarOpen = signal(false);

  // Enrolled Courses with Start Date, Approx End Date, Batch Timing, Actions
  enrolledCourses = signal<CourseDetailItem[]>([
    {
      id: 'web-dev',
      title: 'Full Stack Web Development',
      category: 'Software Development',
      icon: 'code',
      iconColor: '#00e5ff',
      progress: 62,
      startDate: '15 Jan 2026',
      endDate: '15 Jul 2026',
      batchTiming: '04:00 PM - 05:30 PM (Mon-Fri)',
      instructor: 'Mr. Ajay Khandelwal',
      totalHours: 180,
      completedHours: 112,
      admitCardAvailable: true,
      certificateAvailable: false
    },
    {
      id: 'cyber-sec',
      title: 'Cyber Security & Ethical Hacking',
      category: 'Information Security',
      icon: 'security',
      iconColor: '#a855f7',
      progress: 35,
      startDate: '01 Mar 2026',
      endDate: '31 Aug 2026',
      batchTiming: '10:00 AM - 11:30 AM (Tue-Sat)',
      instructor: 'Mr. Vivek Sharma',
      totalHours: 150,
      completedHours: 53,
      admitCardAvailable: true,
      certificateAvailable: false
    },
    {
      id: 'tally-gst',
      title: 'Tally Prime with GST & Tax',
      category: 'Accounting & Finance',
      icon: 'account_balance',
      iconColor: '#10b981',
      progress: 100,
      startDate: '10 Nov 2025',
      endDate: '10 Feb 2026',
      batchTiming: '02:00 PM - 03:30 PM (Mon-Sat)',
      instructor: 'Mrs. Sunita Verma',
      totalHours: 90,
      completedHours: 90,
      admitCardAvailable: true,
      certificateAvailable: true
    },
  ]);

  // Student Applications
  applications = signal<StudentApplication[]>([
    {
      id: 'APP-2026-081',
      applicationName: 'NTT - Nursery Teacher Training 2026',
      appliedDate: '12 Aug 2026',
      status: 'Approved',
      courseCategory: 'Teacher Education',
      remarks: 'Documents verified. Seat confirmed.'
    },
    {
      id: 'APP-2026-074',
      applicationName: 'ECCE - Early Childhood Care & Education',
      appliedDate: '04 Aug 2026',
      status: 'Under Review',
      courseCategory: 'Child Development',
      remarks: 'Application under verification by admission committee.'
    },
    {
      id: 'APP-2026-052',
      applicationName: 'Full Stack Web Development (Govt Scheme)',
      appliedDate: '15 Jul 2026',
      status: 'Approved',
      courseCategory: 'Software Development',
      remarks: '100% Fee Waiver Approved.'
    }
  ]);

  // Schedule
  schedule = signal<ScheduleItem[]>([
    { time: '10:00 AM', subject: 'Cyber Security - Network Scanning', instructor: 'Mr. Vivek Sharma', room: 'Lab 2', type: 'lab' },
    { time: '12:00 PM', subject: 'Tally - GST Filing Practice', instructor: 'Mrs. Sunita Verma', room: 'Room 3', type: 'class' },
    { time: '04:00 PM', subject: 'Web Dev - Angular Routing', instructor: 'Mr. Ajay Khandelwal', room: 'Lab 1', type: 'class' },
    { time: '06:00 PM', subject: 'Web Dev - Mock Test', instructor: 'Mr. Ajay Khandelwal', room: 'Lab 1', type: 'test' },
  ]);

  // Announcements
  announcements = signal<Announcement[]>([
    {
      id: 1,
      title: 'Holiday Notice – 26th July',
      body: 'The institute will remain closed on 26th July on account of a local holiday. All regular classes and lab practice sessions will resume normally on 28th July.',
      date: '20 Jul 2026',
      priority: 'high',
      icon: 'event_busy',
    },
    {
      id: 2,
      title: 'Web Dev Mock Test & Project Submission',
      body: 'A comprehensive mock test on Angular Routing & RxJS state management will be conducted today at 6:00 PM in Lab 1. Attendance is mandatory for certificate eligibility.',
      date: '19 Jul 2026',
      priority: 'medium',
      icon: 'quiz',
    },
    {
      id: 3,
      title: 'Tally Prime Certificate Distribution Desk',
      body: 'Students who completed the Tally Prime course can collect their official certificates from the administrative block desk between 11:00 AM and 01:00 PM.',
      date: '18 Jul 2026',
      priority: 'low',
      icon: 'workspace_premium',
    }
  ]);

  // Modals state
  selectedAnnouncement = signal<Announcement | null>(null);
  selectedCourseForView = signal<CourseDetailItem | null>(null);
  selectedApplicationForView = signal<StudentApplication | null>(null);
  leaveModalOpen = signal<boolean>(false);
  actionFeedback = signal<string | null>(null);

  // Leave Form
  leaveForm = new FormGroup({
    leaveType: new FormControl('Single Day', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  // Action methods
  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  toggleEmptyDemo() {
    this.showEmptyState.update((v) => !v);
  }

  // Course actions
  downloadAdmitCard(course: CourseDetailItem) {
    this.showFeedback(`Downloading Admit Card for ${course.title}...`);
  }

  downloadCertificate(course: CourseDetailItem) {
    if (!course.certificateAvailable) {
      this.showFeedback(`Certificate for ${course.title} will be available upon 100% course completion.`);
      return;
    }
    this.showFeedback(`Downloading Official Certificate for ${course.title}...`);
  }

  viewCourseDetails(course: CourseDetailItem) {
    this.selectedCourseForView.set(course);
  }

  closeCourseModal() {
    this.selectedCourseForView.set(null);
  }

  // Announcement Modal actions
  openAnnouncementModal(announcement: Announcement) {
    this.selectedAnnouncement.set(announcement);
  }

  closeAnnouncementModal() {
    this.selectedAnnouncement.set(null);
  }

  // Application Modal actions
  viewApplication(app: StudentApplication) {
    this.selectedApplicationForView.set(app);
  }

  closeApplicationModal() {
    this.selectedApplicationForView.set(null);
  }

  // Start new application check profile
  startNewApplication() {
    this.profileService.checkProfileAndProceed(
      this.router,
      () => {
        this.router.navigate(['/student/courses']);
      },
      (msg) => {
        this.showFeedback(msg);
      }
    );
  }

  // Leave Modal actions
  openLeaveModal() {
    this.leaveModalOpen.set(true);
  }

  closeLeaveModal() {
    this.leaveModalOpen.set(false);
    this.leaveForm.reset({ leaveType: 'Single Day' });
  }

  submitLeaveRequest() {
    if (this.leaveForm.invalid) {
      this.leaveForm.markAllAsTouched();
      return;
    }
    const val = this.leaveForm.value;
    if (val.fromDate && val.toDate && new Date(val.toDate) < new Date(val.fromDate)) {
      this.leaveForm.get('toDate')?.setErrors({ dateOrder: true });
      this.leaveForm.get('toDate')?.markAsTouched();
      return;
    }

    this.closeLeaveModal();
    this.showFeedback(`Leave request submitted successfully from ${val.fromDate} to ${val.toDate}.`);
  }

  showFeedback(msg: string) {
    this.actionFeedback.set(msg);
    setTimeout(() => {
      this.actionFeedback.set(null);
    }, 4000);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
