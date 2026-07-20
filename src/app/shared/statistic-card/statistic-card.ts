import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Statistic } from '../../models/statistic.model';

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticCardComponent {
  statistic = input.required<Statistic>();
}
