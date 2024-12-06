import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { ImpressumComponent } from './components/impressum/impressum.component';

// Importiere die neuen Detailseiten für die Projekte
import { ProjectGuardianComponent } from './components/project-guardian/project-guardian.component';
import { ProjectPortfolioComponent } from './components/project-portfolio/project-portfolio.component';
import { ProjectBarberComponent } from './components/project-barber/project-barber.component';
import { ProjectSkaterComponent } from './components/project-skater/project-skater.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'datenschutz', component: DatenschutzComponent },
    { path: 'impressum', component: ImpressumComponent },
    
    // Routen für die Projekt-Detailseiten
    { path: 'project/guardian', component: ProjectGuardianComponent },
    { path: 'project/portfolio', component: ProjectPortfolioComponent },
    { path: 'project/barber-app', component: ProjectBarberComponent },
    { path: 'project/skater-app', component: ProjectSkaterComponent },

    // Standard-Weiterleitungen
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
