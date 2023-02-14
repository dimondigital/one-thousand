import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { debounceTime, skip, BehaviorSubject, from, takeUntil,race, merge, concat, distinctUntilChanged, Observable, Subject, switchMap, combineLatest, forkJoin } from 'rxjs';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-customizable-exchange-rate',
  templateUrl: './customizable-exchange-rate.component.html',
  styleUrls: ['./customizable-exchange-rate.component.scss']
})
export class CustomizableExchangeRateComponent implements OnInit, OnDestroy {

  symbols: {[key: string]: string} = {'UAH': 'fasdf', 'USD': 'adsf', 'fddf': '22'};
  defaultValues = {from: 'UAH', to: 'USD', amount: 1}

  constructor(private currencyS: CurrencyService) {}

  private destroy: Subject<boolean> = new Subject<boolean>();
  private readonly currencyAmountBase$ = new BehaviorSubject<{amount: number, isBase: boolean}>(
        {amount: this.defaultValues.amount, isBase: true}
      );
  private readonly currencyAmountSecond$ = new BehaviorSubject<{amount: number, isBase: boolean}>(
      {amount: 1, isBase: false}
    );
  public readonly currencyCodeBase$ = new BehaviorSubject<{code: string, isBase: boolean}>(
      {code: this.defaultValues.from, isBase: true}
    );
  private readonly currencyCodeSecond$ = new BehaviorSubject<{code: string, isBase: boolean}>(
      {code: this.defaultValues.to, isBase: false}
    );

  changeBase(amount: number): void {
    console.log(1)
    this.currencyAmountBase$.next({amount, isBase: true});
  }
  changeSecond(amount: number): void {
    console.log(2)
    this.currencyAmountSecond$.next({amount, isBase: false});
  }

  selectBase(e: Event): void {
    console.log(3)
    let code = (e.target as HTMLInputElement).value;
    this.currencyCodeBase$.next({code, isBase: true});
  }
  selectSecond(e: Event): void {
    console.log(4)
    let code = (e.target as HTMLInputElement).value;
    this.currencyCodeSecond$.next({code, isBase: false});
  }

  ngOnInit(): void {

    // this.currencyS.getSymbols().subscribe(data => {
    //   this.symbols = data.symbols;
    // });

    merge(
       this.currencyAmountBase$.pipe(debounceTime(1000)),
       this.currencyAmountSecond$.pipe(debounceTime(1000)),
       this.currencyCodeBase$,
       this.currencyCodeSecond$
    )
    .pipe(
      skip(4), // skip first initial emmission
      takeUntil(this.destroy),
      distinctUntilChanged(),
    )
    .subscribe((change) => {
      let reqData: {from: string, to: string, amount: number};
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
      this.calculateRates(reqData);
    });

  }

  calculateRates(reqData: {}) {
    console.log(`reqData: ${JSON.stringify(reqData)}`);
    console.log('calc');


// this.currencyS.getExchangeRate().pipe(
//           // map(res => res.properties)
//         ).subscribe(data => {
//           console.log(data);
//           this.currencyBase = ""+data.query.amount;
//           this.currencyBaseCode = data.query.from;
//           this.currencyDesired = ""+data.info.rate;
//           this.currencyDesiredCode = data.query.to;
//         });
//   }
  }

  ngOnDestroy(): void {
    this.destroy.next(false);
    this.destroy.complete();
  }

}
