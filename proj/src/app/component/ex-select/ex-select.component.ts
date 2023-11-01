import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ex-select',
  templateUrl: './ex-select.component.html',
  styleUrls: ['./ex-select.component.scss']
})
export class ExSelectComponent implements OnInit {

  @Input() code: string = "";
  @Output() output: EventEmitter<string> = new EventEmitter();
  @Input() symbols!: Observable<string[]>;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onSelected(value: string): void {
    this.code = value;
    this.output.emit(this.code)
  }

}
