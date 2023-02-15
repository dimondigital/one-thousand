import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ExchangerateHost } from 'src/app/api/exchangerate.host/api-types';

import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-static-exchange-rate',
  templateUrl: './static-exchange-rate.component.html',
  styleUrls: ['./static-exchange-rate.component.scss']
})
export class StaticExchangeRateComponent implements OnInit, OnDestroy {

  currencyAmountBase: string = "";
  currencyCodeBase: string = "";
  currencyAmountSecond: string = "";
  currencyCodeSecond: string = "";
  defaultRate: ExchangerateHost.ApiReqExchangeRate = {from: 'UAH', to: 'USD', amount: '1'};

  constructor(private currencyS: CurrencyService) {}

  ngOnInit(): void {
      this.currencyS.getExchangeRate(this.defaultRate)!.pipe(
        // map(res => res.properties)
      ).subscribe(data => {
        console.log(data);
        this.currencyAmountBase = ""+data.query.amount;
        this.currencyCodeBase = data.query.from;
        this.currencyAmountSecond = ""+data.info.rate;
        this.currencyCodeSecond = data.query.to;
      });
  }

  ngOnDestroy(): void {

  }

}
