import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {JwtInterceptor} from "./pages/pages/auth/core/interceptor/jwt.interceptor";
import {CoreModule} from "./pages/pages/auth/core/core.module";
import { CategoryComponent } from './pages/apps/category/category.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule,
      CoreModule,
    CustomLayoutModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
