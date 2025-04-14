import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { EjemploComponent } from './components/ejemplo/ejemplo.component';

export const routes: Routes = [
  { path: 'lista', component: CustomerListComponent },
  { path: 'ejemplo', component: EjemploComponent }
];
