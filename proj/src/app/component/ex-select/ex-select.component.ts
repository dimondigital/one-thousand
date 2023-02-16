import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom, from, Observable } from 'rxjs';
import { CurrencyService } from 'src/app/service/currency.service';

@Component({
  selector: 'app-ex-select',
  templateUrl: './ex-select.component.html',
  styleUrls: ['./ex-select.component.scss']
})
export class ExSelectComponent implements OnInit {

  @Input() code: string = "";
  @Output() output: EventEmitter<string> = new EventEmitter();
  public symbols!: Observable<string[]>;

  constructor(private currencyS: CurrencyService) {}

  ngOnInit(): void {
    this.getSymbols();
  }

  private async getSymbols() {
    this.symbols = await from(firstValueFrom(this.currencyS.getSymbols()));
  }

  public onSelected(value: string): void {
    this.code = value;
    this.output.emit(this.code)
  }

}
