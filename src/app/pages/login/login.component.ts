import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  showPassword = signal(false);
  isLoading = signal(false);
  email = '';
  password = '';

  constructor(
    private router: Router,
    private supabase: SupabaseService
  ) {}

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  async onLogin() {
    if (!this.email || !this.password) return;

    this.isLoading.set(true);
    try {
      const { error } = await this.supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (error) throw error;

      this.router.navigate(['/']);
    } catch (error: any) {
      alert(error.message || 'Erro ao fazer login');
    } finally {
      this.isLoading.set(false);
    }
  }
}
