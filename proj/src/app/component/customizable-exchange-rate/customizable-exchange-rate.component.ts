import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, takeUntil, merge, concat, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-customizable-exchange-rate',
  templateUrl: './customizable-exchange-rate.component.html',
  styleUrls: ['./customizable-exchange-rate.component.scss']
})
export class CustomizableExchangeRateComponent implements OnInit, OnDestroy {

  symbols: {[key: string]: string} = {'ddf': 'fasdf', 'uuf': 'adsf', 'fddf': 'asdf'};

  currencyBase: string = "";
  currencyBaseCode: string = "";
  currencyDesired: string = "";
  currencyDesiredCode: string = "";

  constructor(private currencyS: CurrencyService) {}

  private destroy: Subject<boolean> = new Subject<boolean>();
  private readonly inputSubject = new Subject<number | undefined>();
  private readonly selectSubject = new Subject<string | undefined>();

  ngOnInit(): void {
    this.currencyS.getSymbols().subscribe(data => {
        this.symbols = data.symbols;
      });




    merge(
      this.inputSubject.pipe(
        debounceTime(1000)
      ),
      this.selectSubject)
    .pipe(
      takeUntil(this.destroy),
      distinctUntilChanged()
    )
    .subscribe(data => {
      this.calculateRates();
    });

  }

  calculateRates() {
    console.log('calc');


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

  onInputUpdate(event: Event): void {
    let update = (event.target as HTMLInputElement).valueAsNumber;
    if (update < 1) return;
    update = parseInt((""+update).trim(), 10);
    (event.target as HTMLInputElement).value = ""+update;
    this.inputSubject.next(update);
  }

  onSelectUpdate(event: Event): void {
    let update = (event.target as HTMLSelectElement).value;
    this.selectSubject.next(update);
  }

  ngOnDestroy(): void {
    this.destroy.next(false);
    this.destroy.complete();
  }

}
