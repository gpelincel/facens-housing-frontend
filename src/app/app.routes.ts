import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { OwnerProfileComponent } from './pages/owner-profile/owner-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: OwnerProfileComponent },
  { path: 'add-property', component: AddPropertyComponent },
];
