import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // RouterModule importieren

@Component({
  selector: 'app-datenschutz',
  standalone: true,
  imports: [RouterModule], // RouterModule hinzufügen
  templateUrl: './datenschutz.component.html',
  styleUrls: ['./datenschutz.component.scss'] // "styleUrls" korrigiert (Plural)
})
export class DatenschutzComponent {}
