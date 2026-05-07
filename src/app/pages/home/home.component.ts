import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { CategoryFiltersComponent } from '../../components/category-filters/category-filters.component';
import { Property } from '../../core/models/property.model';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, CategoryFiltersComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  featuredProperties: Property[] = [
    {
      id: '1',
      title: 'República Masculina',
      price: 750,
      location: 'Jd. Simus, Sorocaba',
      distance: 1.3,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '2',
      title: 'Apartamento 2 quartos',
      price: 1100,
      location: 'Wanel Ville, Sorocaba',
      distance: 2.1,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: '3',
      title: 'Kitnet mobiliada',
      price: 650,
      location: 'Éden, Sorocaba',
      distance: 1.8,
      imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];
}
