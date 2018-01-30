import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRoutingModule} from './event-routing.module'
import {EventService} from "./event.service";

import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule
  ],
  declarations: [
    EventComponent,
    RegistrationComponent
  ],
  providers: [
    EventService
  ],
  exports: [
    EventComponent
  ]
})
export class EventModule {
}
