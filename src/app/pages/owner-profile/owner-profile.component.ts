import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatRowComponent } from '../../shared/components/stat-row/stat-row.component';

@Component({
  selector: 'app-owner-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, StatRowComponent],
  templateUrl: './owner-profile.component.html'
})
export class OwnerProfileComponent implements OnInit {
  owner = {
    name: 'João Silva',
    role: 'Anunciante',
    rating: 4.8,
    reviewsCount: 27,
    memberSince: 'Março de 2023',
    activeAds: 3,
    responseTime: 'Menos de 1 hora',
    phone: '(15) 99876-5432',
    bio: 'Olá! Sou estudante da Facens e anunciante de imóveis para estudantes. Estou sempre disponível para ajudar!',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  };

  constructor() {}

  ngOnInit() {}
}
