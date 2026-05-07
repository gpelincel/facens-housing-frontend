import { Component, OnInit, signal } from '@angular/core';
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
  currentImageIndex = signal(0);
  isDescriptionExpanded = signal(false);
  
  // Drag/Swipe state
  private startX = 0;
  private currentX = 0;
  private isDragging = false;
  dragOffset = signal(0);
  
  images = [
    'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.property = {
      id: id || '1',
      title: 'Apartamento 2 quartos',
      price: 1100,
      location: 'Wanel Ville, Sorocaba - SP',
      distance: 2.1,
      imageUrl: this.images[0]
    };
  }

  // Carousel Actions
  nextImage() {
    if (this.currentImageIndex() < this.images.length - 1) {
      this.currentImageIndex.update(i => i + 1);
    }
  }

  prevImage() {
    if (this.currentImageIndex() > 0) {
      this.currentImageIndex.update(i => i - 1);
    }
  }

  setIndex(index: number) {
    this.currentImageIndex.set(index);
  }

  // Drag/Swipe Handlers
  onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getClientX(event);
    this.dragOffset.set(0);
  }

  onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    
    this.currentX = this.getClientX(event);
    const offset = this.currentX - this.startX;
    
    // Boundary resistance
    if (
      (this.currentImageIndex() === 0 && offset > 0) ||
      (this.currentImageIndex() === this.images.length - 1 && offset < 0)
    ) {
      this.dragOffset.set(offset / 3); // More resistance at edges
    } else {
      this.dragOffset.set(offset);
    }
    
    // Prevent default to avoid scrolling while dragging the carousel
    if (event.cancelable) event.preventDefault();
  }

  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    
    const threshold = 100; // pixels to trigger slide
    const finalOffset = this.dragOffset();
    
    if (finalOffset < -threshold) {
      this.nextImage();
    } else if (finalOffset > threshold) {
      this.prevImage();
    }
    
    this.dragOffset.set(0);
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  async shareProperty() {
    if (!this.property) return;

    const shareData = {
      title: this.property.title,
      text: `Confira este imóvel no Facens Housing: ${this.property.title} por R$ ${this.property.price}/mês`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Link copiado para a área de transferência!');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  }
}
