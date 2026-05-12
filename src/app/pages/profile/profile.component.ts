import { Component, OnInit, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SupabaseService } from '../../core/services/supabase.service';
import { StatRowComponent } from '../../shared/components/stat-row/stat-row.component';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, StatRowComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user: Signal<User | null> | null = null;
  isLoading = signal(true);

  constructor(
    private supabase: SupabaseService,
    private router: Router,
  ) {
    this.user = supabase.currentUser;
  }

  async ngOnInit() {
    // Wait for initial load if needed, but signal will update automatically
    setTimeout(() => this.isLoading.set(false), 500);

    // Safety check: if no user after a moment, redirect
    const user = await this.supabase.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
    }
  }

  async logout() {
    try {
      await this.supabase.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Erro ao sair');
    }
  }

  get userMetadata() {
    return this.user!()?.user_metadata;
  }
}
