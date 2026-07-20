import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent {
  title = input.required<string>();
  subtitle = input<string | undefined>(undefined);
  centered = input<boolean>(true);
  lightTheme = input<boolean>(false);
}
