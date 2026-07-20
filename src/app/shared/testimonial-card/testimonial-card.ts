import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialCardComponent {
  testimonial = input.required<Testimonial>();

  getStars(rating: number): number[] {
    return Array(rating).fill(0).map((_, i) => i);
  }
}
