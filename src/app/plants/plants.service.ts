// src/app/plants/plants.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plant } from './plant'; // Assurez-vous d'importer le modèle Plant

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  
  // URL de base de votre API NestJS
  // private apiUrl = 'http://localhost:3000/plants'; 
  private apiUrl = 'https://plant-manager-backend-nestjs.onrender.com/plants'; 

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste complète des plantes.
   */
  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }

  createPlant(plantData: Partial<Plant>): Observable<Plant> {
    // Le POST envoie les données (le DTO) à l'endpoint /plants
    return this.http.post<Plant>(this.apiUrl, plantData);
  }

  waterPlant(id: number): Observable<Plant> {
    const waterUrl = `${this.apiUrl}/${id}/water`;
    // Le PATCH renvoie la plante mise à jour
    return this.http.patch<Plant>(waterUrl, {}); 
  }

  getPlantById(id: number): Observable<Plant> {
    const detailUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Plant>(detailUrl); 
  }

  /**
   * 💡 NOUVELLE MÉTHODE : Récupère la liste des plantes qui ont besoin d'eau.
   */
  getPlantsDue(): Observable<Plant[]> {
    const dueUrl = `${this.apiUrl}/due`; // Appelle le nouveau contrôleur backend
    return this.http.get<Plant[]>(dueUrl);
  }
}