import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinesRegisterComponent } from './bussines-register.component';

describe('BussinesRegisterComponent', () => {
  let component: BussinesRegisterComponent;
  let fixture: ComponentFixture<BussinesRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BussinesRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BussinesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
