import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PrimaryButtonComponent } from '../primary-button/primary-button';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [MatIconModule, PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './hero-banner.html',
  styleUrl: './hero-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBannerComponent {
  exploreClicked = output<void>();
  contactClicked = output<void>();

  onExplore() {
    this.exploreClicked.emit();
  }

  onContact() {
    this.contactClicked.emit();
  }
}
