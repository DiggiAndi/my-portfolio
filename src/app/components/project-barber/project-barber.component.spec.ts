import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBarberComponent } from './project-barber.component';

describe('ProjectBarberComponent', () => {
  let component: ProjectBarberComponent;
  let fixture: ComponentFixture<ProjectBarberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBarberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectBarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
