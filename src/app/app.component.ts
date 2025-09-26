import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { PlantsService } from './plants/plants.service';
import { Plant } from './plants/plant';
// Importation de l'interface Plant depuis son fichier source


@Component({
  selector: 'app-root',
  standalone: true,
  // DatePipe est nécessaire pour formater la date dans le HTML
  imports: [RouterOutlet, RouterLink, CommonModule, DatePipe], 
  // Utilise les fichiers externes
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'] 
})
export class AppComponent implements OnInit {
  title = '🌿 Plant Manager 🪴';

  // OBSERVABLE CONTENANT LE TABLEAU COMPLET DES PLANTES À ARROSER
  plantsDue$!: Observable<Plant[]>;

  // Injecte le service
  constructor(private plantsService: PlantsService) {}

  ngOnInit(): void {
    // Le service retourne le flux de la liste de plantes
    this.plantsDue$ = this.plantsService.getPlantsDue();
  }
}
