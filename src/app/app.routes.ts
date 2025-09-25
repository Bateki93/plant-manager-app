// src/app/app.routes.ts (CORRIGÉ)

import { Routes } from '@angular/router';
import { PlantListComponent } from './plants/plant-list/plant-list.component';
import { PlantFormComponent } from './plants/plant-form/plant-form.component';
import { PlantDetailComponent } from './plants/plant-detail/plant-detail.component';

export const routes: Routes = [
  
  { path: 'plants/:id', component: PlantDetailComponent },
  
  { path: 'plants', component: PlantListComponent },
  
  { path: 'add', component: PlantFormComponent }, 
  { path: '', redirectTo: 'plants', pathMatch: 'full' },
  { path: '**', redirectTo: 'plants' } 
];