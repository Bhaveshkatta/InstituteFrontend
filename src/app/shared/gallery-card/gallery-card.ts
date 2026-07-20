import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gallery-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './gallery-card.html',
  styleUrl: './gallery-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCardComponent {
  imageUrl = input.required<string>();
  title = input<string>('Campus View');
}
