import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';

import {UserComponent} from "./user.component";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    ProfileComponent
  ]
})
export class UserModule {
}
