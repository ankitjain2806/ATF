import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";

@NgModule({
  imports: [
    RouterModule.forChild([{
        path: 'event',
        component: EventComponent,
        data: {title: "Event"}
      },
      {
        path: 'event/registration',
        component: RegistrationComponent,
        data: {title: "Event"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
