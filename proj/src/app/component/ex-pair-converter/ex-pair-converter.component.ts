import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';
import { CurrencyService } from 'src/app/service/currency.service';
import { ApiReqExchangeRate } from "../../api/api-types";
import { ExGroupOutput } from '../ex-group/ex-group-output.type';

@Component({
  selector: 'app-ex-pair-converter',
  templateUrl: './ex-pair-converter.component.html',
  styleUrls: ['./ex-pair-converter.component.scss']
})
export class ExPairConverter implements OnInit, OnDestroy {

  defaultPairCodes: string[] = ['USD', 'UAH'];
  currencyFirstAmount: string = '1';
  currencyFirstCode: string = "";
  currencySecondAmount: string = '1';
  currencySecondCode: string = "";

  changeGroup1: Subject<ExGroupOutput> = new Subject<ExGroupOutput>();
  changeGroup2: Subject<ExGroupOutput> = new Subject<ExGroupOutput>();

  calculateGroupInitiator: boolean = false; // boolean for 0-1 switch. Group index initiator
  isCalculating: boolean = false;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private currencyS: CurrencyService) {}

  ngOnInit(): void {

    combineLatest(
      [this.changeGroup1,
      this.changeGroup2]
    ).pipe(
      takeUntil(this.destroy),
      distinctUntilChanged(),
      map(exPairData => {
        let [from, to, amount] = [
          exPairData[+this.calculateGroupInitiator].code,
          exPairData[+!this.calculateGroupInitiator].code,
          exPairData[+this.calculateGroupInitiator].amount]
        return {from, to, amount}
      })
    )
    .subscribe((reqData) => {
      this.calculateRates(reqData);
    });
  }

  calculateRates(reqData: ApiReqExchangeRate) {
    this.isCalculating = true;

    this.currencyS.getExchangeRate(reqData)!
      .subscribe(data => {
        this.isCalculating = false;
          if(!this.calculateGroupInitiator) { // if calculation initiator is FIRST group
            this.currencyFirstAmount = data.query.amount;
            this.currencyFirstCode = data.query.from;
            this.currencySecondAmount = data.result;
            this.currencySecondCode = data.query.to;
          } else { // if calculation initiator is SECOND group
            this.currencySecondAmount = data.query.amount;
            this.currencySecondCode = data.query.from;
            this.currencyFirstAmount = data.result;
            this.currencyFirstCode = data.query.to;
          }

      });
  }

  checkInitiator(idx: number): void {
    this.calculateGroupInitiator = !!idx;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
