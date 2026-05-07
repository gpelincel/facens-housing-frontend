import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  showPassword = signal(false);
  email = '';
  password = '';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onLogin() {
    // Simple mock login navigation
    console.log('Login attempt:', this.email);
    this.router.navigate(['/']);
  }
}
