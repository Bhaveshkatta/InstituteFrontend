import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../models/course.model';
import { PrimaryButtonComponent } from '../primary-button/primary-button';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, PrimaryButtonComponent],
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent {
  course = input.required<Course>();
  enrollClicked = output<Course>();

  onEnroll() {
    this.enrollClicked.emit(this.course());
  }

  // Generate an array representing the stars (e.g. [1, 1, 1, 1, 0.5])
  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('star');
      } else if (i === fullStars && hasHalf) {
        stars.push('star_half');
      } else {
        stars.push('star_border');
      }
    }
    return stars;
  }
}
