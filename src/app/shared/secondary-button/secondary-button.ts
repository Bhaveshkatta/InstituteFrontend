import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
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
