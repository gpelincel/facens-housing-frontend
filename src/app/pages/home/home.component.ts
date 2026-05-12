import { Component, Signal, signal } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { CategoryFiltersComponent } from '../../components/category-filters/category-filters.component';
import { Property } from '../../core/models/property.model';
import { SupabaseService } from '../../core/services/supabase.service';
import { User } from '@supabase/supabase-js';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, CategoryFiltersComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  user: Signal<User|null>|null = null;

  constructor(private supabase: SupabaseService) {
    this.user = supabase.currentUser
  }

  featuredProperties: Property[] = [
    {
      id: '1',
      title: 'República Masculina',
      description: 'Vaga em república estudantil.',
      price: 750,
      location: 'Jd. Simus, Sorocaba',
      distance: 1.3,
      image_url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Wi-Fi'],
      owner_id: 'mock'
    },
    {
      id: '2',
      title: 'Apartamento 2 quartos',
      description: 'Apartamento espaçoso.',
      price: 1100,
      location: 'Wanel Ville, Sorocaba',
      distance: 2.1,
      image_url: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Mobiliado'],
      owner_id: 'mock'
    },
    {
      id: '3',
      title: 'Kitnet mobiliada',
      description: 'Kitnet individual.',
      price: 650,
      location: 'Éden, Sorocaba',
      distance: 1.8,
      image_url: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      amenities: ['Cozinha'],
      owner_id: 'mock'
    }
  ];
}
