import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StaticExchangeRateComponent } from './component/static-exchange-rate/static-exchange-rate.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticExchangeRateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
