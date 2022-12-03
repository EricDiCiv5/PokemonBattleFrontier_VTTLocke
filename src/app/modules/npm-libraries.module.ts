import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// import ngx-translate and the http loader
import {HttpClient, HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    // ngx-translate and the loader module
    HttpClientModule,
  ],
  exports: [
    BrowserModule,
    CommonModule,
    // ngx-translate and the loader module
    HttpClientModule,
    
  ]
})
export class NpmLibrariesModule { }
