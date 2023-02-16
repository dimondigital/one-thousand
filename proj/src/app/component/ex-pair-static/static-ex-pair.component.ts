import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiReqExchangeRate } from 'src/app/api/api-types';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-static-ex-pair',
  templateUrl: './static-ex-pair.component.html',
  styleUrls: ['./static-ex-pair.component.scss']
})
export class StaticExPairComponent implements OnInit, OnDestroy {

  currencyAmountBase: string = "";
  currencyCodeBase: string = "";
  currencyAmountSecond: string = "";
  currencyCodeSecond: string = "";
  defaultRate: ApiReqExchangeRate = {from: 'UAH', to: 'USD', amount: '1'};

  private destroy$: Subject<boolean> = new Subject();

  constructor(private currencyS: CurrencyService) {}

  ngOnInit(): void {
      this.currencyS.getExchangeRate(this.defaultRate)!
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.currencyAmountBase = ""+data.query.amount;
          this.currencyCodeBase = data.query.from;
          this.currencyAmountSecond = ""+data.info.rate;
          this.currencyCodeSecond = data.query.to;
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
