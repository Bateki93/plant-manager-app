// src/app/plants/plant-form/plant-form.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PlantsService } from '../plants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant-form',
  standalone: true,
  // Modules essentiels pour les formulaires et les directives de base
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {
  
  // Le groupe de contrôle pour lier le modèle au template
  plantForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder, // Injecte FormBuilder pour créer le formulaire
    private plantsService: PlantsService, // Injecte le service pour l'API
    private router: Router // Injecte le Router pour la navigation
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire avec des valeurs par défaut et des validateurs
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      // Valeur par défaut : date d'aujourd'hui
      purchaseDate: [new Date().toISOString().substring(0, 10), Validators.required], 
      imageUrl: [''],
      // Fréquence minimum de 1 jour
      frequencyDays: [7, [Validators.required, Validators.min(1)]], 
      waterQuantity: ['Moyen', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.plantForm.valid) {
      
      // Envoie les données au backend via le service
      this.plantsService.createPlant(this.plantForm.value).subscribe({
        next: () => {
          alert('Plante ajoutée avec succès !');
          // Redirige l'utilisateur vers la liste des plantes
          this.router.navigate(['/plants']);
        },
        error: (err) => {
          console.error("Erreur lors de l'ajout de la plante:", err);
          alert("Erreur: Échec de l'ajout de la plante.");
        }
      });
    }
  }
}