import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiReqExchangeRate, ApiResExchangeRate, ApiResSymbols } from '../api/api-types';
import { API_GET_CONVERT, API_GET_SYMBOLS, API_URL_BASE } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  cachedSymbols$!: Observable<string[]>;

  constructor(private http: HttpClient) { }

  getSymbols(): Observable<string[]> {
    const options = {
      method: 'GET',
      url: API_URL_BASE + API_GET_SYMBOLS,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if(!this.cachedSymbols$) {
      this.cachedSymbols$ = this.http.get<ApiResSymbols>(options.url, options).pipe(
        shareReplay(1),
        map(data => Object.keys(data.symbols))
      );
    }
    return this.cachedSymbols$;
  }

  getExchangeRate(reqData: ApiReqExchangeRate): Observable<ApiResExchangeRate> {
    const options = {
      method: 'GET',
      url: API_URL_BASE + API_GET_CONVERT,
      params: reqData,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return this.http.get<ApiResExchangeRate>(options.url, options);
  }
}
