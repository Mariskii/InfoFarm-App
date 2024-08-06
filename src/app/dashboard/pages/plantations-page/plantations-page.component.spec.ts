import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantationsPageComponent } from './plantations-page.component';

describe('PlantationsPageComponent', () => {
  let component: PlantationsPageComponent;
  let fixture: ComponentFixture<PlantationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantationsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
