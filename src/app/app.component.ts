import { Component, OnInit } from '@angular/core';
import { BackendService, BookModel } from './backend.service';
import { TimestampService } from './timestamp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ebook-page-mapper';
  models: BookModel[];
  loading = true;

  constructor(
    private backendService: BackendService,
    // private timestampService: TimestampService,
  ) {}

  ngOnInit() {
    // todo make the caching better (same as Bookworm probably)
    // todo unlike Bookworm, the user can play with the dom before stuff loads (and when stuff loads their changes get clobbered). fix this!
    // todo backend call should probably time out?
    this.models = this.backendService.getCached();
    this.backendService.get().then(x => {
      this.loading = false;
      this.models = x;
    });

    // window.t = this.timestampService;
  }
}
