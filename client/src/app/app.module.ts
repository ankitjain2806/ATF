import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


/*
import {HomeComponent} from './pages/home/home.component';
*/
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
/*import {UserComponent} from './pages/user/user.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {EventComponent} from './pages/event/events/event.component';*/

import {AppService} from "./app.service";

import {HomeModule} from './pages/home/home.module';
import {UserModule} from './pages/user/user.module';
import {HeaderModule} from './header/header.module';
import {EventModule} from "./pages/event/event.module";
import {DashboardModule} from "./pages/dashboard/dashboard.module";

import {HttpService} from './shared/util/http.service';
import {UserSessionService} from "./shared/util/user-session.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
/*    UserComponent,
    DashboardComponent,
    EventComponent,*/
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HomeModule,
    UserModule,
    HeaderModule,
    EventModule,
    DashboardModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
    AppService,
    UserSessionService
  ], bootstrap: [AppComponent]
})
export class AppModule {
}
