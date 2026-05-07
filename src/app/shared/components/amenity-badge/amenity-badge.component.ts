import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenity-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs font-medium text-gray-700">
      <i class="fi mt-1 text-primary" [class]="icon"></i>
      {{ label }}
    </div>
  `
})
export class AmenityBadgeComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) label!: string;
}
