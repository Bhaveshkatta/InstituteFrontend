import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SHARED_IMPORTS } from '../shared.imports';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' = 'primary';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() btnType: 'button' | 'submit' | 'reset' = 'button';
  @Input() icon: string = '';
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() fullWidth: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
