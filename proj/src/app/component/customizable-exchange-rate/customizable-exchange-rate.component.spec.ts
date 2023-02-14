import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableExchangeRateComponent } from './customizable-exchange-rate.component';

describe('CustomizableExchangeRateComponent', () => {
  let component: CustomizableExchangeRateComponent;
  let fixture: ComponentFixture<CustomizableExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomizableExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
