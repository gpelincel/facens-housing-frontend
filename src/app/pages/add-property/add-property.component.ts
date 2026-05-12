import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase.service';
import { Property } from '../../core/models/property.model';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent {
  isLoading = signal(false);
  
  property: Property = {
    title: '',
    description: '',
    price: 0,
    location: '',
    distance: 0,
    image_url: '',
    amenities: [],
    owner_id: '',
    owner_phone: ''
  };

  amenityInput = '';

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  addAmenity() {
    if (this.amenityInput.trim()) {
      this.property.amenities.push(this.amenityInput.trim());
      this.amenityInput = '';
    }
  }

  removeAmenity(index: number) {
    this.property.amenities.splice(index, 1);
  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.isLoading.set(true);
      try {
        const user = await this.supabase.getCurrentUser();
        if (!user) {
          this.router.navigate(['/login']);
          return;
        }

        this.property.owner_id = user.id;
        
        // Ensure price and distance are numbers
        this.property.price = Number(this.property.price);
        this.property.distance = Number(this.property.distance);

        await this.supabase.createProperty(this.property);
        
        alert('Locação cadastrada com sucesso!');
        this.router.navigate(['/']);
      } catch (error: any) {
        alert(error.message || 'Erro ao cadastrar locação');
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
