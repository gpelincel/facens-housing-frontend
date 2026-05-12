import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SupabaseService } from '../../core/services/supabase.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  showPassword = signal(false);
  isLoading = signal(false);
  name = '';
  email = '';
  password = '';
  agreeTerms = false;

  constructor(
    private router: Router,
    private supabase: SupabaseService
  ) {}

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  async onRegister(form: NgForm) {
    if (form.valid && this.agreeTerms) {
      this.isLoading.set(true);
      try {
        const { error } = await this.supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              full_name: this.name,
            },
          },
        });

        if (error) throw error;

        alert('Cadastro realizado com sucesso! Verifique seu e-mail se necessário.');
        this.router.navigate(['/login']);
      } catch (error: any) {
        alert(error.message || 'Erro ao realizar cadastro');
      } finally {
        this.isLoading.set(false);
      }
    } else {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
