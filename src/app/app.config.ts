import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes'; // Import der Routing-Konfiguration

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Routing bereitstellen
    provideClientHydration(), // Für SSR (Server-Side Rendering), wenn verwendet
    provideAnimationsAsync() // Asynchrone Animationen
  ]
};
