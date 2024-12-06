import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGuardianComponent } from './project-guardian.component';

describe('ProjectGuardianComponent', () => {
  let component: ProjectGuardianComponent;
  let fixture: ComponentFixture<ProjectGuardianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectGuardianComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectGuardianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
