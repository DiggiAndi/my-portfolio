import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // HttpClient hinzufügen
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig, // Bestehende Konfiguration
  providers: [
    ...(appConfig.providers || []), // Behalte bestehende Provider aus appConfig
    provideHttpClient(), // HttpClient hinzufügen
  ],
})
  .catch((err) => console.error(err));
