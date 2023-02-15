import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { ApiResSymbols, ApiResExchangeRate, ApiReqExchangeRate } from '../api/api-types';
import { API_GET_CONVERT, API_GET_SYMBOLS, API_URL_BASE } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  cachedSymbols$!: Observable<ApiResSymbols>;

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
      this.cachedSymbols$ = this.http.get<ApiResSymbols>(options.url, options).pipe(
        shareReplay(1)
      );
    }
    return this.cachedSymbols$;
  }

  getExchangeRate(reqData: ApiReqExchangeRate): Observable<ApiResExchangeRate> | null {
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
    return this.http.get<ApiResExchangeRate>(options.url, options);
  }
}
