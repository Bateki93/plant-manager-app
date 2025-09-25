

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 💡 Importez ceci
import { Observable, BehaviorSubject, switchMap } from 'rxjs'; 
import { Plant } from '../plant';
import { PlantsService } from '../plants.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  standalone: true, // 💡 Ceci indique que c'est un composant autonome
  // 💡 Ajoutez les modules nécessaires dans les imports du COMPOSANT
  imports: [CommonModule, RouterLink], 
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  
  private reloadPlantsSubject = new BehaviorSubject<boolean>(true);
  plants$!: Observable<Plant[]>; 

  constructor(private plantsService: PlantsService) {}

   ngOnInit() {
    // Chaque fois que reloadPlantsSubject émet, on recharge la liste depuis l'API
    this.plants$ = this.reloadPlantsSubject.pipe(
      switchMap(() => this.plantsService.getAllPlants())
    );
  }

   onWaterPlant(plantId: number): void {
    this.plantsService.waterPlant(plantId).subscribe({
      next: (updatedPlant) => {
        alert(`${updatedPlant.name} a été arrosée !`);
        
        // 💡 Déclenche le rechargement de la liste pour afficher la nouvelle date
        this.reloadPlantsSubject.next(true); 
      },
      error: (err) => {
        console.error("Erreur lors de l'arrosage:", err);
        alert("Impossible d'arroser la plante. Vérifiez le serveur NestJS.");
      }
    });
  }
}