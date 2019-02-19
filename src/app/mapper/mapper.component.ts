import { Component, OnInit, Input } from '@angular/core';
import { BookModel, Timestamp, strToSec, secToStr } from '../backend.service';

@Component({
  selector: 'app-mapper',
  templateUrl: './mapper.component.html',
  styleUrls: ['./mapper.component.scss']
})
export class MapperComponent implements OnInit {

  @Input() model: BookModel;
  @Input("a-to-b") aToB: boolean;

  from: string;
  to: string;

  computedToValue: string;

  constructor() { }

  ngOnInit() {
    this.from = this.aToB ? this.model.formatA : this.model.formatB;
    this.to = this.aToB ? this.model.formatB : this.model.formatA;
  }

  onFromChange(value: string) {
    let valNum = +value;
    if (isNaN(valNum)) {
      valNum = strToSec(value);
    }

    if (valNum === 0) {
      this.computedToValue = ''
    } else {
      let x;
      if (this.aToB) {
        x = round(this.model.toB(valNum));
        if (this.model.bIsTimestamp) {
          x = secToStr(x);
        }
      } else {
        x = round(this.model.toA(valNum));
        if (this.model.aIsTimestamp) {
          x = secToStr(x);
        }
      }
      this.computedToValue = x;
    }
  }

}

function round(n) {
  return Math.round(n * 10) / 10;
}