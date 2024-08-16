import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderFromPlantationComponent } from './create-order-from-plantation.component';

describe('CreateOrderFromPlantationComponent', () => {
  let component: CreateOrderFromPlantationComponent;
  let fixture: ComponentFixture<CreateOrderFromPlantationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOrderFromPlantationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOrderFromPlantationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
