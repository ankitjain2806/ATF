import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TreasurehuntComponent} from "./treasurehunt/treasurehunt.component";
import {OverviewComponent} from "./treasurehunt/overview/overview.component";
import {IngameComponent} from "./treasurehunt/ingame/ingame.component";
import {EventDetailComponent} from "./event-details/event-detail.component";

import {EventDetailsResolverService} from "./event-details/event-details-resolver.service";
import {EventEndComponent} from "./event-end/event-end.component";
import {EventEndDetailsResolverService} from "./event-end/event-end-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'event',
        component: EventComponent,
        data: {title: "Event"}
      },
      {
        path: 'event/registration/:slug',
        component: RegistrationComponent,
        data: {title: "Event Registration"},
      },
      {
        path: 'event/:slug',
        component: EventDetailComponent,
        data: {title: "Event Detail", path: 'event/:slug'},
        resolve: {
          event: EventDetailsResolverService
        }
      },
      {
        path: 'event/:slug/finished',
        component: EventEndComponent,
        data: {title: "Event Completed!", path: 'event/:slug/finished'}
      },
      {
        path: 'treasurehunt',
        component: TreasurehuntComponent,
        data: {title: 'Treasure Hunt'},
        children: [
          { path: '', redirectTo: '/home', pathMatch: 'full' },
          { path: ':id/overview', component: OverviewComponent },
          { path: ':id/game', component: IngameComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
