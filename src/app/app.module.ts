import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { ComponentsModule } from './components/components.module';
import {HttpClientModule} from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LayoutAdminComponent } from './layoutad/layout-admin/layout-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutMainComponent,
    LayoutAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  },
  CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
