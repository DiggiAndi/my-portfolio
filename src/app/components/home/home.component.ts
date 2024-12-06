import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common'; // CommonModule importieren

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // CommonModule hinzufügen
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  selectedCertificate: string | null = null; // Variable für modale Anzeige

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById('codeCanvas') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');

      if (!ctx) {
        console.error('Canvas konnte nicht initialisiert werden.');
        return;
      }

      canvas.width = window.innerWidth;
      canvas.height = 300;

      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const drops = Array(columns).fill(0);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        drops.forEach((y, x) => {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, x * fontSize, y * fontSize);

          if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
          }
          drops[x]++;
        });
      };

      setInterval(draw, 50);
    }
  }

  openCertificate(src: string): void {
    this.selectedCertificate = src;
  }

  closeCertificate(): void {
    this.selectedCertificate = null;
  }
}
