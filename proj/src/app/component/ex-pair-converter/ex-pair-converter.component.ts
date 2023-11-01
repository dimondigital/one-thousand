import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, distinctUntilChanged, map, Observable, Subject, takeUntil} from 'rxjs';
import {CurrencyService} from 'src/app/service/currency.service';
import {ApiReqExchangeRate} from "../../api/api-types";
import {ExGroupOutput} from '../ex-group/ex-group-output.type';

@Component({
  selector: 'app-ex-pair-converter',
  templateUrl: './ex-pair-converter.component.html',
  styleUrls: ['./ex-pair-converter.component.scss']
})
export class ExPairConverter implements OnInit, OnDestroy {

  @Input() symbols!: Observable<string[]>;
  public currencyFirstAmount: string = '1';
  public currencySecondAmount: string = '1';
  public defaultPairCodes: string[] = ['USD', 'UAH'];
  public changeGroup1: Subject<ExGroupOutput> = new Subject<ExGroupOutput>();
  public changeGroup2: Subject<ExGroupOutput> = new Subject<ExGroupOutput>();
  public isCalculating: boolean = false;

  private _calculateGroupInitiator: boolean = false; // boolean for 0-1 switch. Group index initiator
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private currencyS: CurrencyService) {
  }

  ngOnInit(): void {

    combineLatest(
      [this.changeGroup1,
        this.changeGroup2]
    ).pipe(
      takeUntil(this._destroy$),
      distinctUntilChanged(),
      map(exPairData => {
        let [from, to, amount] = [
          exPairData[+this._calculateGroupInitiator].code,
          exPairData[+!this._calculateGroupInitiator].code,
          exPairData[+this._calculateGroupInitiator].amount]
        return {from, to, amount}
      })
    )
      .subscribe((reqData) => {
        this.calculateRates(reqData);
      });
  }

  private calculateRates(reqData: ApiReqExchangeRate) {
    this.isCalculating = true;

    this.currencyS.getExchangeRate(reqData)!
      .subscribe(data => {
        this.isCalculating = false;
        if (!this._calculateGroupInitiator) { // if calculation initiator is FIRST group
          this.currencyFirstAmount = data.query.amount;
          this.currencySecondAmount = data.result;
        } else { // if calculation initiator is SECOND group
          this.currencySecondAmount = data.query.amount;
          this.currencyFirstAmount = data.result;
        }

      });
  }

  public checkInitiator(idx: number): void {
    this._calculateGroupInitiator = !!idx;
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

}
