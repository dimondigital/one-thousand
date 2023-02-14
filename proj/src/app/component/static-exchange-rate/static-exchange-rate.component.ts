import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-static-exchange-rate',
  templateUrl: './static-exchange-rate.component.html',
  styleUrls: ['./static-exchange-rate.component.scss']
})
export class StaticExchangeRateComponent implements OnInit, OnDestroy {

  currencyBase: string = "";
  currencyBaseCode: string = "";
  currencyDesired: string = "";
  currencyDesiredCode: string = "";

  constructor(private currencyS: CurrencyService) {}

  ngOnInit(): void {
      this.currencyS.getExchangeRate().pipe(
        // map(res => res.properties)
      ).subscribe(data => {
        console.log(data);
        this.currencyBase = ""+data.query.amount;
        this.currencyBaseCode = data.query.from;
        this.currencyDesired = ""+data.info.rate;
        this.currencyDesiredCode = data.query.to;
      });
  }

  ngOnDestroy(): void {

  }

}
