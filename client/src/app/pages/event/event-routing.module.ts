import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EventComponent} from "./events/event.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TreasurehuntComponent} from "./treasurehunt/treasurehunt.component";
import {OverviewComponent} from "./treasurehunt/overview/overview.component";
import {IngameComponent} from "./treasurehunt/ingame/ingame.component";

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
      },
      {
        path: 'treasurehunt',
        component: TreasurehuntComponent,
        data: {title: 'Treasure Hunt'},
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: OverviewComponent },
          { path: 'game', component: IngameComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
