import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

const CACHE_KEY = 'bookworm/cached-page-mappings';
const API_KEY_KEY = 'bookworm/google-api-key';
const headers = ["Template","","","","Point 1","Point 2"];

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private parser = new Parser();

  constructor(private http: HttpClient) { }

  // todo instead of making this silly get/getCached interface, use an observable(??)
  public getCached() {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const res = JSON.parse(cachedData);
      return this.parser.parse(res['values'] as string[][]);
    }
  }

  public get() {
    // Using the same API key as Bookworm! I'll probably integrate these together anyway(?)
    const API_KEY=localStorage.getItem(API_KEY_KEY);
    if (API_KEY) {
      const RANGE='A1:G500';
      const SPREADSHEET_ID='1EBL8G5OggmqgWkShYmn8u5umJ6etdTI_iyOOy_9xfaA';
      const url=`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      return this.http.get(url).toPromise().then(
        res => {
          localStorage.setItem(CACHE_KEY, JSON.stringify(res));
          return this.parser.parse(res['values'] as string[][]);
        },
        err => {
          window.alert('Error fetching from db');
          return [];
        }
      );
    } else {
      return Promise.reject();
    }
  }
}

export class BookModel {
  private slope: number;
  private intercept: number;

  constructor(
    public bookTitle: string,
    public formatA: string,
    public formatB: string,
    a1,
    a2,
    b1,
    b2,
  ) {
    this.slope = (b1 - b2) / (a1 - a2);
    this.intercept = b1 - this.slope * a1;
  }

  public isValid() {
    return !isNaN(this.slope);
  }

  toB(a: number) {
    return a * this.slope + this.intercept;
  }

  toA(b: number) {
    return (b - this.intercept) / this.slope;
  }
}

const [A,B,C,D,E,F,G] = [0,1,2,3,4,5,6];

class Parser {
  

  parse(rows: string[][]): BookModel[] {
    if (! this.headerEqualsExpected(rows)) {
      window.alert("Headers have changed. Stopping")
      return null;
    }
    console.log('parsing')
    const ret = [];
    for (let r = 6; r < 100; r += 4) {
      const headerRow = rows[r];
      if (!headerRow) {
        break;
      }
      const row1 = rows[r + 1];
      const row2 = rows[r + 2];
      const model = new BookModel(
        headerRow[A],
        row1[A],
        row2[A],
        row1[E],
        row1[F],
        row2[E],
        row2[F]
      );
      if (model.isValid()) {
        ret.push(model)
      }
    }
    console.log(ret);
    window.models = ret;
    return ret;
  }
  // parseRow(row: string[]): Row {
    

  //   const ret = new Row();
  //   ret.createdAt = row[A];
  //   ret.book = row[B];
  //   ret.start = row[C];
  //   ret.end = row[D];
  //   ret.notes = row[E];
  //   return ret;
  // }

  private headerEqualsExpected(rows: string[][]): boolean {
    // todo array comparison using lodash or something?
    return JSON.stringify(rows[0]) === JSON.stringify(headers);
  }
}