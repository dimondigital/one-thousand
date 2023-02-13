import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticExchangeRateComponent } from './static-exchange-rate.component';

describe('StaticExchangeRateComponent', () => {
  let component: StaticExchangeRateComponent;
  let fixture: ComponentFixture<StaticExchangeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticExchangeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticExchangeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
