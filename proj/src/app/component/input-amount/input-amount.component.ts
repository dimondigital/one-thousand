import { Component, EventEmitter, Input, Output } from '@angular/core';
import { multicast, Subject } from 'rxjs';

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss']
})
export class InputAmountComponent {

  @Input() amount: number = 0;
  @Output() output: EventEmitter<number> = new EventEmitter();

  out(e: Event) {
    let update = (e.target as HTMLInputElement).valueAsNumber;
    if (update < 0) update = 0;
    update = parseInt((""+update).trim(), 10); // remove all zeros at the begin

    if (0 <= update) {
      (e.target as HTMLInputElement).value = ""+update;
      this.output.emit(update);
    }
  }

}
