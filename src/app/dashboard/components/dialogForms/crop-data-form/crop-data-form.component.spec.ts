import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropDataFormComponent } from './crop-data-form.component';

describe('CropDataFormComponent', () => {
  let component: CropDataFormComponent;
  let fixture: ComponentFixture<CropDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
