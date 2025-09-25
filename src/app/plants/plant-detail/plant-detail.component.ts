import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // 💡 Pour lire les paramètres de l'URL
import { PlantsService } from '../plants.service';
import { Plant } from '../plant';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {

  // L'objet Plant est stocké dans un Observable pour l'utiliser avec le pipe 'async'
  plant$!: Observable<Plant | undefined>;

  constructor(
    private route: ActivatedRoute,
    private plantsService: PlantsService,
  ) { }

  ngOnInit(): void {
    // 1. Écouter les changements de paramètres dans l'URL (l'ID)
    this.plant$ = this.route.params.pipe(
      // 2. Transformer l'ID en une requête de données
      switchMap(params => {
        const id = +params['id']; // Le '+' convertit la chaîne en nombre
        if (isNaN(id)) {
          // Gérer le cas où l'ID est invalide
          console.error("ID de plante invalide dans l'URL");
          return new Observable<Plant | undefined>(); 
        }
        // 3. Appeler le service pour récupérer la plante
        return this.plantsService.getPlantById(id);
      })
    );
  }
}