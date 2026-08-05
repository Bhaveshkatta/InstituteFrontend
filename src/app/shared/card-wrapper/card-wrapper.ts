import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../shared.imports';

@Component({
  selector: 'app-card-wrapper',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './card-wrapper.html',
  styleUrl: './card-wrapper.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardWrapperComponent {
  @Input() title?: string;
  @Input() icon?: string;
  @Input() subtitle?: string;
  @Input() actionLabel?: string;
  @Input() actionIcon?: string;
  @Input() glass: boolean = true;

  @Output() actionClicked = new EventEmitter<void>();

  onAction(): void {
    this.actionClicked.emit();
  }
}
