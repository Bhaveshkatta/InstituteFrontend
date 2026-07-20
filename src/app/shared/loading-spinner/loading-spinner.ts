import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  diameter = input<number>(50);
  strokeWidth = input<number>(4);
  mode = input<'determinate' | 'indeterminate'>('indeterminate');
  value = input<number>(0);
  overlay = input<boolean>(false);
}
