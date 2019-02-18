import { Component, OnInit } from '@angular/core';
import { BackendService, BookModel } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ebook-page-mapper';

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getCached();
  }
}
