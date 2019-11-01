import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { ValueComponent } from './value/value.component';
import { PhotoComponent } from './photo/photo.component';
import {CityDetailComponent} from './city/city-detail/city-detail.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      ValueComponent,
      CityComponent,
      PhotoComponent,
      CityDetailComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
