import { Component, OnInit, Input } from '@angular/core';
import { BookModel } from '../backend.service';

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
    if (isNaN(valNum) || valNum === 0) {
      this.computedToValue = ''
    } else {
      if (this.aToB) {
        this.computedToValue = round(this.model.toB(valNum)).toString();
      } else {
        this.computedToValue = round(this.model.toA(valNum)).toString();
      }
    }
  }

}

function round(n) {
return Math.round(n*10)/10;
}