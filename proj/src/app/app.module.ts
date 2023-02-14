import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StaticExchangeRateComponent } from './component/static-exchange-rate/static-exchange-rate.component';
import { CustomizableExchangeRateComponent } from './component/customizable-exchange-rate/customizable-exchange-rate.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticExchangeRateComponent,
    CustomizableExchangeRateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
