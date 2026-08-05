import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../shared.imports';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [...SHARED_IMPORTS, ButtonComponent],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input({ required: true }) title!: string;
  @Input() description?: string;
  @Input() actionLabel?: string;
  @Input() actionIcon?: string;

  @Output() actionClicked = new EventEmitter<void>();

  onAction(): void {
    this.actionClicked.emit();
  }
}
