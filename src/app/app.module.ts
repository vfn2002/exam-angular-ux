import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateComponent } from './components/landing-page/create/create.component';
import {ListComponent} from './components/landing-page/list/list.component';
import {InternService} from "./services/Intern.service";
import { HeaderComponent } from './components/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {MyFilterPipe} from "./components/filter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CreateComponent,
    ListComponent,
    HeaderComponent,
    MyFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [InternService],
  bootstrap: [AppComponent]
})
export class AppModule { }
