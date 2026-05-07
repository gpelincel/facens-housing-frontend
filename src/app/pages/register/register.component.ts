import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  showPassword = signal(false);
  name = '';
  email = '';
  password = '';
  agreeTerms = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onRegister(form: NgForm) {
    if (form.valid && this.agreeTerms) {
      console.log('Registration attempt:', { name: this.name, email: this.email });
      // Mock success and redirect to login
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      this.router.navigate(['/login']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
