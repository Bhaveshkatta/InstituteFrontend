import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../shared.imports';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './loading-indicator.html',
  styleUrl: './loading-indicator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {
  @Input() overlay: boolean = false;
  @Input() message?: string;
  @Input() diameter: number = 48;
}
