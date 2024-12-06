import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Für HTTP-Anfragen
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule importieren
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Für Formularbindung

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // HttpClientModule hier hinzufügen
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  name: string = ''; // Speichert den Namen des Benutzers
  email: string = ''; // Speichert die E-Mail-Adresse
  message: string = ''; // Speichert die Nachricht
  snackbarMessage: string = ''; // Nachricht im Snackbar
  snackbarVisible: boolean = false; // Kontrolliert die Sichtbarkeit des Snackbar

  constructor(private http: HttpClient) {}

  // Funktion zum Senden des Formulars
  sendMessage(): void {
    if (!this.name || !this.email || !this.message) {
      this.showSnackbar('Bitte alle Felder ausfüllen!'); // Snackbar bei unvollständigem Formular
      return;
    }

    const contactData = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    // Sende eine POST-Anfrage an den Server
    this.http.post('/api/contact', contactData).subscribe(
      () => {
        this.showSnackbar('Nachricht erfolgreich gesendet!'); // Erfolgsnachricht
        this.clearForm(); // Formular zurücksetzen
      },
      (error) => {
        console.error('Fehler beim Senden der Nachricht:', error);
        this.showSnackbar('Fehler beim Senden der Nachricht.'); // Fehlermeldung
      }
    );
  }

  // Funktion zum Anzeigen des Snackbar
  private showSnackbar(message: string): void {
    this.snackbarMessage = message;
    this.snackbarVisible = true;

    // Snackbar nach 3 Sekunden ausblenden
    setTimeout(() => {
      this.snackbarVisible = false;
    }, 3000);
  }

  // Funktion zum Zurücksetzen des Formulars
  private clearForm(): void {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
