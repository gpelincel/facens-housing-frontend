import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Property } from '../../core/models/property.model';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-details.component.html'
})
export class PropertyDetailsComponent implements OnInit {
  property?: Property;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Mocking property fetch based on ID
    // In a real app, we would use a service
    const id = this.route.snapshot.paramMap.get('id');
    
    // Example data
    this.property = {
      id: id || '1',
      title: 'Apartamento 2 quartos',
      price: 1100,
      location: 'Wanel Ville, Sorocaba - SP',
      distance: 2.1,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    };
  }
}
