import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filters.component.html'
})
export class CategoryFiltersComponent {
  filters = [
    { label: 'Filtros', icon: 'fi-rr-settings-sliders', active: true },
    { label: 'Preço', icon: 'fi-rr-money', active: false },
    { label: 'Tipo', icon: 'fi-rr-home', active: false },
    { label: 'Distância', icon: 'fi-rr-marker', active: false }
  ];
}
