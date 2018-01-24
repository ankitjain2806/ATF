import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {HomeComponent} from './pages/home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {UserComponent} from './pages/user/user.component';
import {ProfileComponent} from './pages/profile/profile.component';

import {HomeModule} from './pages/home/home.module';
import {UserModule} from './pages/user/user.module';
import {HeaderModule} from './header/header.module';
import {ProfileModule} from './pages/profile/profile.module';

import {HttpService} from './shared/util/http.service'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HomeModule,
    UserModule,
    HeaderModule,
    // HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ProfileModule,
    AngularFontAwesomeModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
