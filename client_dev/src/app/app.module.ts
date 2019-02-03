import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PageComponent } from './components/page/page.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ConsultorService } from './services/consultor.service';
import { ValueArrayPipe } from './components/pipes/transformArray';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateArrayForPipe } from './components/pipes/validate-array-for.pipe';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageComponent,
    ValueArrayPipe,
    ValidateArrayForPipe,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,

  ],
  providers: [ HttpClientModule, ConsultorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
