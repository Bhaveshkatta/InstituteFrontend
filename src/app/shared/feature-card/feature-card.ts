import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Feature } from '../../models/feature.model';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './feature-card.html',
  styleUrl: './feature-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureCardComponent {
  feature = input.required<Feature>();
}
