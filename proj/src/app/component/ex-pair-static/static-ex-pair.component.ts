import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {ApiReqExchangeRate} from 'src/app/api/api-types';
import {CurrencyService} from 'src/app/service/currency.service';

@Component({
  selector: 'app-static-ex-pair',
  templateUrl: './static-ex-pair.component.html',
  styleUrls: ['./static-ex-pair.component.scss']
})
export class StaticExPairComponent implements OnInit, OnDestroy {

  public currencyAmountBase: string = "";
  public currencyCodeBase: string = "";
  public currencyAmountSecond: string = "";
  public currencyCodeSecond: string = "";

  private _defaultRate: ApiReqExchangeRate = {from: 'UAH', to: 'USD', amount: '1'};
  private _destroy$: Subject<boolean> = new Subject();

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService.getExchangeRate(this._defaultRate)
      .pipe(takeUntil(this._destroy$))
      .subscribe(data => {
        this.currencyAmountBase = "" + data.query.amount;
        this.currencyCodeBase = data.query.from;
        this.currencyAmountSecond = "" + data.info.rate;
        this.currencyCodeSecond = data.query.to;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

}
