import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantationExpandedPageComponent } from './plantation-expanded-page.component';

describe('PlantationExpandedPageComponent', () => {
  let component: PlantationExpandedPageComponent;
  let fixture: ComponentFixture<PlantationExpandedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantationExpandedPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantationExpandedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
