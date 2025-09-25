// src/app/app.component.ts (Vérification Finale)

import { Component, OnInit } from '@angular/core'; 
import { RouterOutlet, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common'; // Requis par *ngIf
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators'; // Pour l'opérateur map
import { PlantsService } from './plants/plants.service'; // 💡 L'IMPORT CRITIQUE

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule], 
 template: `
  <header>
    <h1>{{ title }}</h1>
    <nav>
      <a [routerLink]="['/plants']">
        Liste des Plantes
        <span 
          *ngIf="needsWaterCount$ | async as count; else noCount" 
          >
          <span *ngIf="count > 0" class="badge">
            ({{ count }} 🔔)
          </span>
        </span>
        <ng-template #noCount></ng-template>
      </a> 
      | 
      <a [routerLink]="['/add']">Ajouter une Plante</a>
    </nav>
  </header>
  <main>
    <router-outlet></router-outlet>
  </main>
`,

  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = '🌿 Plant Manager 🪴';
  
  // 💡 Utilisez '!' pour l'initialisation asynchrone
  needsWaterCount$!: Observable<number>;

  // Injecte le service
  constructor(private plantsService: PlantsService) {} 

  ngOnInit(): void {
    // Initialise l'observable pour obtenir le compte
    this.needsWaterCount$ = this.plantsService.getPlantsDue().pipe(
      map(plants => plants.length) 
    );
  }
}