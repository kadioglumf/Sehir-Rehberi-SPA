import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import {NgxGalleryModule} from 'ngx-gallery';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AlertifyService} from './services/alertify.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';
import { PhotoComponent } from './photo/photo.component';
import {CityDetailComponent} from './city/city-detail/city-detail.component';
import {CityAddComponent} from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';
import {NgxEditorModule} from 'ngx-editor';
import { AuthGuard } from './helper/auth.guard';
import { LoginComponent } from './login/login.component';
import { AuthHtppInterceptorService } from './services/AuthHtppInterceptor.service';
import {FileUploadModule} from 'ng2-file-upload';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      CityComponent,
      PhotoComponent,
      CityDetailComponent,
      CityAddComponent,
      RegisterComponent,
      LoginComponent
      ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FormsModule,
      ReactiveFormsModule,
      NgxEditorModule,
      FileUploadModule,
      NgxSpinnerModule,
      BrowserAnimationsModule
   ],
   providers: [
      AlertifyService,
      [AuthGuard],
      {  
         provide:HTTP_INTERCEPTORS, useClass:AuthHtppInterceptorService, multi:true 
       }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
