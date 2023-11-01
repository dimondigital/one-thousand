import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, shareReplay} from 'rxjs';
import {ApiReqExchangeRate, ApiResExchangeRate, ApiResSymbols} from '../api/api-types';
import {API_GET_CONVERT, API_GET_SYMBOLS, API_MY_KEY, API_URL_BASE} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  cachedSymbols$!: Observable<string[]>;

  constructor(private http: HttpClient) {
  }

  public getSymbols(): Observable<string[]> {
    if (!this.cachedSymbols$) {
      const options = {
        method: 'GET',
        url: API_URL_BASE + API_GET_SYMBOLS,
        headers: {
          apikey: API_MY_KEY,
          'Content-Type': 'application/json'
        }
      };
      this.cachedSymbols$ = this.http.get<ApiResSymbols>(options.url, options).pipe(
        shareReplay(1),
        map(data => Object.keys(data.symbols))
      );
    }
    return this.cachedSymbols$;
  }

  public getExchangeRate(defaultRate: ApiReqExchangeRate): Observable<ApiResExchangeRate> {
    const options = {
      method: 'GET',
      url: API_URL_BASE + API_GET_CONVERT,
      params: defaultRate,
      headers: {
        apikey: API_MY_KEY,
        'Content-Type': 'application/json'
      }
    };
    return this.http.get<ApiResExchangeRate>(options.url, options);
  }
}
