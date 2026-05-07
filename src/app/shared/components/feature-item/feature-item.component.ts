import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center border border-gray-100">
      <i class="fi text-primary text-xl mb-1" [class]="icon"></i>
      <span class="text-[10px] font-bold">{{ value }}</span>
      <span class="text-[9px] text-gray-500">{{ label }}</span>
    </div>
  `
})
export class FeatureItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) value!: string | number;
  @Input({ required: true }) label!: string;
}
