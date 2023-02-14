import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { IApiResExchangeRate, IApiResSymbols } from '../i-api-res';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  cachedSymbols$!: Observable<IApiResSymbols>;

  constructor(private http: HttpClient) { }

  getSymbols() {
    const options = {
      method: 'GET',
      url: 'https://api.apilayer.com/fixer/symbols',
      headers: {
        'apikey': 'nEkeV88xA7AZeInXrPCSxkFtSwSlB26r'
      }
    };
    if(!this.cachedSymbols$) {
      this.cachedSymbols$ = this.http.get<IApiResSymbols>(options.url, options).pipe(
        shareReplay(1)
      );
    }
    return this.cachedSymbols$;
  }

  getExchangeRate(from: string = "UAH", to: string = "USD", amount: number = 1): Observable<IApiResExchangeRate> {
    // TODO: add interceptors
    const options = {
      method: 'GET',
      url: 'https://api.apilayer.com/fixer/convert',
      params: {from, to, amount},
      headers: {
        'apikey': 'nEkeV88xA7AZeInXrPCSxkFtSwSlB26r'
      }
    };


    return this.http.get<IApiResExchangeRate>(options.url, options);
  }
}
