// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // 💡 Importez provideRouter

// 💡 Importez votre définition de routes
import { routes } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // 💡 Ajoutez provideRouter pour que les routes soient disponibles au démarrage
    provideRouter(routes), 
  ]
}).catch(err => console.error(err));