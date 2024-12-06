import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSkaterComponent } from './project-skater.component';

describe('ProjectSkaterComponent', () => {
  let component: ProjectSkaterComponent;
  let fixture: ComponentFixture<ProjectSkaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSkaterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSkaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
