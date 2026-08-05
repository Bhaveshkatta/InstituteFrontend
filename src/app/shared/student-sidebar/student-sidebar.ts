import { Component, Input, Output, EventEmitter, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

interface NavLink {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-student-sidebar',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './student-sidebar.html',
  styleUrl: './student-sidebar.scss'
})
export class StudentSidebarComponent implements OnInit, OnDestroy {
  /** Whether the sidebar is open (mobile slide-in). */
  @Input() isOpen = false;

  /** Emitted when user clicks the overlay or a nav item on mobile. */
  @Output() closed = new EventEmitter<void>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private routerSub!: Subscription;

  activeRoute = signal('');

  readonly navLinks: NavLink[] = [
    { label: 'Dashboard',         icon: 'dashboard',        route: '/student/dashboard' },
    { label: 'Courses',           icon: 'school',           route: '/student/courses' },
    { label: 'Govt Free Courses', icon: 'account_balance',  route: '/student/government-courses' },
    { label: 'Profile',           icon: 'person',           route: '/student/profile' },
    { label: 'Timetable',         icon: 'calendar_month',   route: '#' },
    { label: 'Fee Details',       icon: 'receipt_long',     route: '#' },
    { label: 'Certificates',      icon: 'workspace_premium',route: '#' },
    { label: 'Support',           icon: 'support_agent',    route: '#' },
  ];

  ngOnInit(): void {
    this.activeRoute.set(this.router.url);
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.activeRoute.set(e.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  isActive(route: string): boolean {
    return route !== '#' && this.activeRoute().startsWith(route);
  }

  onNavClick(): void {
    this.closed.emit();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
