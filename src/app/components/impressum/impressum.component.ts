import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // RouterModule importieren

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [RouterModule], // RouterModule hinzufügen
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.scss'] // "styleUrls" korrigiert (Plural)
})
export class ImpressumComponent {}
