import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkelletonSquaresComponent } from './skelleton-squares.component';

describe('SkelletonSquaresComponent', () => {
  let component: SkelletonSquaresComponent;
  let fixture: ComponentFixture<SkelletonSquaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkelletonSquaresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkelletonSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
