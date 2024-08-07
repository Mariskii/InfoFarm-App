import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropsPageComponent } from './crops-page.component';

describe('CropsPageComponent', () => {
  let component: CropsPageComponent;
  let fixture: ComponentFixture<CropsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
