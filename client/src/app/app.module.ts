import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoaderComponent} from "./loader/loader.component";


import {HomeModule} from './pages/home/home.module';
import {UserModule} from './pages/user/user.module';
import {HeaderModule} from './header/header.module';
import {EventModule} from "./pages/event/event.module";
import {DashboardModule} from "./pages/dashboard/dashboard.module";
import {SuperAdminModule} from "./pages/superadmin/superadmin.module";

import {AppService} from "./app.service";
import {HttpService} from './shared/util/http.service';
import {UserSessionService} from "./shared/util/user-session.service";
import {SocketService} from "./shared/util/socket.service";
import {AuthGuardService} from "./shared/util/auth-guard.service";
import {LoaderService} from "./shared/util/loader.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    NgbModule,
    NgbModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    HomeModule,
    UserModule,
    HeaderModule,
    EventModule,
    DashboardModule,
    SuperAdminModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
    AppService,
    UserSessionService,
    SocketService,
    AuthGuardService,
    Title,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
