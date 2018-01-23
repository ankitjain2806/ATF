import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {UserComponent} from './pages/user/user.component';

import {HomeModule} from './pages/home/home.module';
import {UserModule} from './pages/user/user.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventItemComponent } from './event-item/event-item.component';
import {AppService} from "./app.service";

import {HttpService} from './shared/util/http.service'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    DashboardComponent,
    EventItemComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HomeModule,
    UserModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
	AppService
  ],  bootstrap: [AppComponent]
})
export class AppModule {
}
