import { Component, EventEmitter, Input, Output, OnInit, ElementRef, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { multicast, Subject, from, of, tap, debounceTime, fromEvent, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss']
})
export class InputAmountComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() amount: string = '';
  @Input() disabled: boolean = false;
  @Output() output: EventEmitter<string> = new EventEmitter();
  @ViewChild('input', {static: false}) input!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if(this.input) this.input.nativeElement.value = this.amount;
  }

  ngAfterViewInit() {


    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
        tap(a => {
          // at the beginning are no zeros
          if (this.input.nativeElement.value <= 0) this.input.nativeElement.value = 0;
          this.input.nativeElement.value = parseInt((""+this.input.nativeElement.value).trim(), 10);
        }),
          debounceTime(1000),
          distinctUntilChanged()
      )
      .subscribe(o => {
        let update = this.input.nativeElement.value;
        if (this.input.nativeElement.value > 0) {
          this.output.emit(this.input.nativeElement.value);
        }
      });
  }

}
