import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Für *ngIf

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  menuOpened: boolean = false;
  isHidden: boolean = false; // Navigation ist standardmäßig sichtbar
  private previousScrollY = 0; // Scroll-Position speichern
  private isBrowser: boolean; // Umgebungsprüfung

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Funktion zum Umschalten des Hamburger-Menüs
  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isBrowser) {
      // Wenn wir uns nicht im Browser befinden, nichts tun
      return;
    }

    const currentScrollY = window.scrollY || 0;

    if (currentScrollY < this.previousScrollY) {
      // Wenn nach oben gescrollt wird, Navigation anzeigen
      this.isHidden = false;
    } else if (currentScrollY > 100) {
      // Wenn nach unten gescrollt wird und Scrollposition > 100px, Navigation ausblenden
      this.isHidden = true;
    }

    this.previousScrollY = currentScrollY;
  }
}
