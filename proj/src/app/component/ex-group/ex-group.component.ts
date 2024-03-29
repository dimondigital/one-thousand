import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ExGroupOutput} from './ex-group-output.type';

@Component({
  selector: 'app-ex-group',
  templateUrl: './ex-group.component.html',
  styleUrls: ['./ex-group.component.scss']
})
export class ExGroupComponent implements OnInit {

  @Input() idx: number | undefined = undefined;
  @Input() amount: string = "";
  @Input() code: string = "";
  @Input() symbols!: Observable<string[]>;
  @Input() output: Subject<ExGroupOutput> = new Subject<ExGroupOutput>();
  @Output() initiator: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.output.next({amount: this.amount, code: this.code});
  }

  public changeAmount(amount: string): void {
    this.amount = amount;
    this.initiator.emit(this.idx);
    this.emitGroup();
  }

  public changeCode(code: string): void {
    this.code = code;
    this.initiator.emit(this.idx);
    this.emitGroup();
  }

  private emitGroup(): void {
    this.output.next({amount: this.amount, code: this.code});
  }

}
