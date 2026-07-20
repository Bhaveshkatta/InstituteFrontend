import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FAQ } from '../../models/faq.model';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './faq-item.html',
  styleUrl: './faq-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FAQItemComponent {
  faq = input.required<FAQ>();
}
