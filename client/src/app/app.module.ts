import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule.forRoot(),
    HomeModule,
    UserModule,
    HeaderModule,
    EventModule,
    DashboardModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
    AppService,
    UserSessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
