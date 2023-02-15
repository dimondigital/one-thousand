import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { ExchangerateHost } from '../api/exchangerate.host/api-types';
import { API_GET_CONVERT, API_GET_SYMBOLS, API_URL_BASE } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  cachedSymbols$!: Observable<ExchangerateHost.ApiResSymbols>;

  constructor(private http: HttpClient) { }

  getSymbols() {
    const options = {
      method: 'GET',
      url: API_URL_BASE + API_GET_SYMBOLS,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if(!this.cachedSymbols$) {
      this.cachedSymbols$ = this.http.get<ExchangerateHost.ApiResSymbols>(options.url, options).pipe(
        shareReplay(1)
      );
    }
    return this.cachedSymbols$;
  }

  getExchangeRate(reqData: ExchangerateHost.ApiReqExchangeRate): Observable<ExchangerateHost.ApiResExchangeRate> | null {
    // TODO: add interceptors
    const options = {
      method: 'GET',
      url: API_URL_BASE + API_GET_CONVERT,
      params: reqData,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log(`get exchange rate REQ OPTIONS: ${options}`)
    // return null;
    return this.http.get<ExchangerateHost.ApiResExchangeRate>(options.url, options);
  }
}
