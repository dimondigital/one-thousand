import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, firstValueFrom, merge, skip, Subject, takeUntil } from 'rxjs';
import { CurrencyService } from 'src/app/service/currency.service';
import { ExchangerateHost } from "../../api/exchangerate.host/api-types"

@Component({
  selector: 'app-customizable-exchange-rate',
  templateUrl: './customizable-exchange-rate.component.html',
  styleUrls: ['./customizable-exchange-rate.component.scss']
})
export class CustomizableExchangeRateComponent implements OnInit, OnDestroy {

  symbols: string[] = ['UAH', 'USD'];
  defaultRate: ExchangerateHost.ApiReqExchangeRate = {from: 'UAH', to: 'USD', amount: '1'};
  isOnBaseCalculation: boolean = true; // true - calculations based on Base(First) select & input changes, false - ..on Second

  currencyAmountBase: string = '1';
  currencyCodeBase: string = "";
  currencyAmountSecond: string = '1';
  currencyCodeSecond: string = "";

  constructor(private currencyS: CurrencyService) {}

  private destroy: Subject<boolean> = new Subject<boolean>();
  private readonly currencyAmountBase$ = new BehaviorSubject<{amount: string, isBase: boolean}>(
        {amount: this.defaultRate.amount, isBase: true}
      );
  private readonly currencyAmountSecond$ = new BehaviorSubject<{amount: string, isBase: boolean}>(
      {amount: '1', isBase: false}
    );
  public readonly currencyCodeBase$ = new BehaviorSubject<{code: string, isBase: boolean}>(
      {code: this.defaultRate.from, isBase: true}
    );
  private readonly currencyCodeSecond$ = new BehaviorSubject<{code: string, isBase: boolean}>(
      {code: this.defaultRate.to, isBase: false}
    );

  changeBase(amount: string): void {
    this.currencyAmountBase$.next({amount, isBase: true});
  }

  changeSecond(amount: string): void {
    this.currencyAmountSecond$.next({amount, isBase: false});
  }

  selectBase(e: Event): void {
    let code = (e.target as HTMLInputElement).value;
    this.currencyCodeBase$.next({code, isBase: true});
  }

  selectSecond(e: Event): void {
    let code = (e.target as HTMLInputElement).value;
    this.currencyCodeSecond$.next({code, isBase: false});
  }

  async getSymbols() {
    const data = await firstValueFrom(this.currencyS.getSymbols())
    this.symbols = Object.keys(data.symbols);
    // this.currencyCodeBase = this.defaultRate.from;
    // this.currencyCodeSecond = this.defaultRate.to;
  }

  ngOnInit(): void {

    this.getSymbols();
    this.calculateRates(this.defaultRate);

    merge(
       this.currencyAmountBase$,
       this.currencyAmountSecond$,
       this.currencyCodeBase$,
       this.currencyCodeSecond$
    )
    .pipe(
      skip(4), // skip first initial emmission
      takeUntil(this.destroy),
      distinctUntilChanged(),
    )
    .subscribe((change) => {
      let reqData: ExchangerateHost.ApiReqExchangeRate;
      if(change?.isBase) {
        reqData = {
          from: this.currencyCodeBase$.getValue()!.code,
          to: this.currencyCodeSecond$.getValue()!.code,
          amount: this.currencyAmountBase$.getValue()!.amount
        }
      } else {
        reqData = {
          from: this.currencyCodeSecond$.getValue()!.code,
          to: this.currencyCodeBase$.getValue()!.code,
          amount: this.currencyAmountSecond$.getValue()!.amount
        }
      }
      this.isOnBaseCalculation = change.isBase;
      this.calculateRates(reqData);
    });

  }

  calculateRates(reqData: ExchangerateHost.ApiReqExchangeRate) {

    this.currencyS.getExchangeRate(reqData)!.pipe(
              // map(res => res.properties)
            ).subscribe(data => {
              if (this.isOnBaseCalculation) {
                this.currencyAmountBase = String(data.query.amount).replace(',', '');
                this.currencyCodeBase = data.query.from;
                this.currencyAmountSecond = String(data.result).replace(',', '');
                this.currencyCodeSecond = data.query.to;
              } else {
                this.currencyAmountSecond = String(data.query.amount).replace(',', '');
                this.currencyCodeSecond = data.query.from;
                this.currencyAmountBase = String(data.result).replace(',', '');
                this.currencyCodeBase = data.query.to;
              }

            });
  }


  ngOnDestroy(): void {
    this.destroy.next(false);
    this.destroy.complete();
  }

}
