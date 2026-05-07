import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-owner-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="mb-8 p-4 bg-gray-50 rounded-[24px] border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors" [routerLink]="['/profile', ownerId]">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img [src]="imageUrl" [alt]="name" class="w-full h-full object-cover">
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-900">{{ name }}</h4>
          <div class="flex items-center gap-1 text-[10px] text-gray-500">
            <i class="fi fi-rr-star text-yellow-500 mt-0.5"></i>
            <span class="font-bold">{{ rating }}</span>
            <span>•</span>
            <span>{{ role }}</span>
          </div>
        </div>
      </div>
      <i class="fi fi-rr-angle-small-right text-gray-400 text-xl"></i>
    </div>
  `
})
export class OwnerPreviewComponent {
  @Input({ required: true }) ownerId!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) imageUrl!: string;
  @Input({ required: true }) rating!: number;
  @Input() role: string = 'Anunciante';
}
