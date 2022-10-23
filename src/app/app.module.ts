import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FullPageComponent } from './components/full-page/full-page.component';
import { AttackFormComponent } from './components/attack-form/attack-form.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './modules/angular-material.module';
import { NpmLibrariesModule } from './modules/npm-libraries.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FullPageComponent,
    AttackFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    NpmLibrariesModule
  ],
  providers: [],
  bootstrap: [FullPageComponent]
})
export class AppModule { }
