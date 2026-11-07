import { Component, ChangeDetectionStrategy, input, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentSidebarComponent } from '../student-sidebar/student-sidebar';
import { ThemeService } from '../../services/theme.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-student-shell',
  standalone: true,
  imports: [
    RouterLink,
    MatIconModule,
    MatButtonModule,
    StudentSidebarComponent
  ],
  templateUrl: './student-shell.html',
  styleUrl: './student-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentShellComponent {
  title = input<string>('Student Portal');
  showBackBtn = input<boolean>(false);
  backLink = input<string>('/student/dashboard');
  backLabel = input<string>('Dashboard');
  showNotifications = input<boolean>(true);
  showAvatar = input<boolean>(true);
  showThemeToggle = input<boolean>(true);

  themeService = inject(ThemeService);
  profileService = inject(ProfileService);

  sidebarOpen = signal<boolean>(false);

  studentName = computed(() => this.profileService.candidateProfile().fullName || 'Rahul Gupta');
  studentId = computed(() => this.profileService.candidateProfile().studentId || 'KC-2024-0412');

  avatarInitials = computed(() => {
    const name = this.studentName().trim();
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (name.slice(0, 2) || 'ST').toUpperCase();
  });

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }
}
