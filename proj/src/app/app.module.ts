import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ExAmountComponent } from './component/ex-amount/ex-amount.component';
import { ExGroupComponent } from './component/ex-group/ex-group.component';
import { ExPairConverter } from './component/ex-pair-converter/ex-pair-converter.component';
import { StaticExPairComponent } from './component/ex-pair-static/static-ex-pair.component';
import { ExSelectComponent } from './component/ex-select/ex-select.component';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticExPairComponent,
    ExPairConverter,
    ExAmountComponent,
    LoaderComponent,
    ExGroupComponent,
    ExSelectComponent
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
