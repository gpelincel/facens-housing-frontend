import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { OwnerProfileComponent } from './pages/owner-profile/owner-profile.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'profile/:id', component: OwnerProfileComponent },
];
