export interface Plant {
  id: number;
  name: string;
  species: string;
  purchaseDate: string;
  imageUrl?: string;
  frequencyDays: number;
  waterQuantity: string;
  lastWatered: string | null;
   wateringEvents: WateringEvent[];
}

export interface WateringEvent {
  id: number;
  wateringDate: string; 
}