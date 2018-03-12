import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';

import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserService} from "./user.service";
import {UserResolverService} from "./profile/user-resolver.service";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent
  ],
  providers: [
    UserService,
    UserResolverService
  ]
})
export class UserModule {
}
