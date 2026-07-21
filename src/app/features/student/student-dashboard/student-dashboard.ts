import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

interface Course {
  id: string;
  title: string;
  category: string;
  icon: string;
  iconColor: string;
  progress: number;
  nextClass: string;
  instructor: string;
  totalHours: number;
  completedHours: number;
}

interface ScheduleItem {
  time: string;
  subject: string;
  instructor: string;
  room: string;
  type: 'class' | 'test' | 'lab';
}

interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, TitleCasePipe, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss',
})
export class StudentDashboard {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  studentName = signal('Rahul Gupta');
  studentId = signal('KC-2024-0412');
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

  stats = signal([
    { label: 'Enrolled Courses', value: '3', icon: 'school', color: '#00e5ff', bg: 'rgba(0,229,255,0.08)' },
    { label: 'Attendance', value: '87%', icon: 'fact_check', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
    { label: 'Upcoming Tests', value: '2', icon: 'quiz', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    { label: 'Certificates', value: '1', icon: 'workspace_premium', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  ]);

  enrolledCourses = signal<Course[]>([
    {
      id: 'web-dev',
      title: 'Full Stack Web Development',
      category: 'Software Development',
      icon: 'code',
      iconColor: '#00e5ff',
      progress: 62,
      nextClass: 'Today, 4:00 PM',
      instructor: 'Mr. Ajay Khandelwal',
      totalHours: 180,
      completedHours: 112,
    },
    {
      id: 'cyber-sec',
      title: 'Cyber Security & Ethical Hacking',
      category: 'Information Security',
      icon: 'security',
      iconColor: '#a855f7',
      progress: 35,
      nextClass: 'Tomorrow, 10:00 AM',
      instructor: 'Mr. Vivek Sharma',
      totalHours: 150,
      completedHours: 53,
    },
    {
      id: 'tally-gst',
      title: 'Tally Prime with GST & Tax',
      category: 'Accounting & Finance',
      icon: 'account_balance',
      iconColor: '#10b981',
      progress: 90,
      nextClass: 'Wed, 2:00 PM',
      instructor: 'Mrs. Sunita Verma',
      totalHours: 90,
      completedHours: 81,
    },
  ]);

  schedule = signal<ScheduleItem[]>([
    { time: '10:00 AM', subject: 'Cyber Security - Network Scanning', instructor: 'Mr. Vivek Sharma', room: 'Lab 2', type: 'lab' },
    { time: '12:00 PM', subject: 'Tally - GST Filing Practice', instructor: 'Mrs. Sunita Verma', room: 'Room 3', type: 'class' },
    { time: '04:00 PM', subject: 'Web Dev - Angular Routing', instructor: 'Mr. Ajay Khandelwal', room: 'Lab 1', type: 'class' },
    { time: '06:00 PM', subject: 'Web Dev - Mock Test', instructor: 'Mr. Ajay Khandelwal', room: 'Lab 1', type: 'test' },
    { time: 'Tomorrow 10:00 AM', subject: 'Cyber Security - Metasploit', instructor: 'Mr. Vivek Sharma', room: 'Lab 2', type: 'lab' },
  ]);

  announcements = signal<Announcement[]>([
    {
      id: 1,
      title: 'Holiday Notice – 26th July',
      body: 'The institute will remain closed on 26th July on account of a local holiday. Classes will resume normally on 28th July.',
      date: '20 Jul 2026',
      priority: 'high',
      icon: 'event_busy',
    },
    {
      id: 2,
      title: 'Web Dev Mock Test – 21st July',
      body: 'A mock test on Angular Routing & RxJS will be conducted today at 6:00 PM in Lab 1. All Web Dev students must attend.',
      date: '19 Jul 2026',
      priority: 'medium',
      icon: 'quiz',
    },
    {
      id: 3,
      title: 'Certificate Distribution – Tally Batch',
      body: 'Students who completed the Tally Prime course (Batch Mar–Jun) can collect their certificates from the admin desk between 11 AM – 1 PM.',
      date: '18 Jul 2026',
      priority: 'low',
      icon: 'workspace_premium',
    },
  ]);

  quickActions = [
    { label: 'Download Certificate', icon: 'download', color: '#10b981' },
    { label: 'View Timetable', icon: 'calendar_month', color: '#00e5ff' },
    { label: 'Fee Details', icon: 'receipt_long', color: '#f59e0b' },
    { label: 'Contact Admin', icon: 'support_agent', color: '#a855f7' },
  ];

  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
