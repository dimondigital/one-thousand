import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StaticExchangeRateComponent } from './component/static-exchange-rate/static-exchange-rate.component';
import { CustomizableExchangeRateComponent } from './component/customizable-exchange-rate/customizable-exchange-rate.component';
import { InputAmountComponent } from './component/input-amount/input-amount.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticExchangeRateComponent,
    CustomizableExchangeRateComponent,
    InputAmountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
