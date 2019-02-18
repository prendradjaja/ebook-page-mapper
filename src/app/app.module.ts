import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MapperComponent } from './mapper/mapper.component';

@NgModule({
  declarations: [
    AppComponent,
    MapperComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule because that's what angular docs said
    // https://devdocs.io/angular/guide/http
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
