import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {CurrencyService} from "./service/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public symbols: Observable<string[]> | undefined;

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getSymbols();
  }

  private getSymbols(): void {
    this.symbols = this.currencyService.getSymbols();
  }

}
