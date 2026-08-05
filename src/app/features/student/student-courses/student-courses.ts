import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StudentSidebarComponent } from '../../../shared/student-sidebar/student-sidebar';

interface CourseDisplay {
  id: string | number;
  title: string;
  description: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  features: string[];
  icon: string;
  iconColor: string;
  enrolled: boolean;
  level: string;
}

@Component({
  selector: 'app-student-courses',
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterLink, FormsModule, StudentSidebarComponent],
  templateUrl: './student-courses.html',
  styleUrl: './student-courses.scss',
})
export class StudentCourses {
  private readonly dataService = inject(DataService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  searchQuery = signal('');
  selectedCategory = signal('All');
  sidebarOpen = signal(false);

  private readonly iconMap: Record<string, { icon: string; color: string }> = {
    'web-dev':    { icon: 'code',              color: '#00e5ff' },
    'python-data':{ icon: 'analytics',         color: '#a855f7' },
    'tally-gst':  { icon: 'account_balance',   color: '#10b981' },
    'ccc-olevel': { icon: 'computer',          color: '#f59e0b' },
    'cyber-sec':  { icon: 'security',          color: '#ef4444' },
  };

  private readonly levelMap: Record<string, string> = {
    'web-dev':     'Intermediate',
    'python-data': 'Beginner',
    'tally-gst':   'Beginner',
    'ccc-olevel':  'Beginner',
    'cyber-sec':   'Advanced',
  };

  private readonly enrolledIds = new Set<string>(['web-dev', 'cyber-sec', 'tally-gst']);

  allCourses = computed<CourseDisplay[]>(() =>
    this.dataService.getCourses()().map(c => ({
      ...c,
      features: c.features ?? [],
      icon: this.iconMap[String(c.id)]?.icon ?? 'school',
      iconColor: this.iconMap[String(c.id)]?.color ?? '#00e5ff',
      enrolled: this.enrolledIds.has(String(c.id)),
      level: this.levelMap[String(c.id)] ?? 'Beginner',
    }))
  );

  categories = computed(() => {
    const cats = ['All', ...new Set(this.allCourses().map(c => c.category))];
    return cats;
  });

  filteredCourses = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();
    return this.allCourses().filter(c => {
      const matchesSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      const matchesCat = cat === 'All' || c.category === cat;
      return matchesSearch && matchesCat;
    });
  });

  totalCourses = computed(() => this.allCourses().length);
  enrolledCount = computed(() => this.allCourses().filter(c => c.enrolled).length);

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  onSearchChange(val: string) {
    this.searchQuery.set(val);
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
