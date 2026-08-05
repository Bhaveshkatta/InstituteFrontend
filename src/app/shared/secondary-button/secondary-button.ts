import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './secondary-button.html',
  styleUrl: './secondary-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondaryButtonComponent {
  label = input.required<string>();
  disabled = input<boolean>(false);
  icon = input<string | undefined>(undefined);
  btnType = input<string>('button');
  
  clicked = output<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
