import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import {HttpService} from 'app/shared/util/http.service';
import {UserSessionService} from "app/shared/util/user-session.service";
import {SocketService} from "app/shared/util/socket.service";
import {AuthGuardService} from "app/shared/util/auth-guard.service";
import {ToasterService} from "app/shared/util/toaster.service";
import {LoaderService} from "app/shared/util/loader.service";

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
    HomeModule,
    UserModule,
    HeaderModule,
    EventModule,
    DashboardModule,
    SuperAdminModule,
    HttpClientModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
    AppService,
    UserSessionService,
    SocketService,
    AuthGuardService,
    Title,
    ToasterService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
