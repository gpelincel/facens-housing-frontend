import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
          <i class="fi mt-1" [class]="icon"></i>
        </div>
        <span class="text-sm font-medium text-gray-600">{{ label }}</span>
      </div>
      <span class="text-sm font-bold text-gray-900">{{ value }}</span>
    </div>
  `
})
export class StatRowComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) value!: string | number;
}
