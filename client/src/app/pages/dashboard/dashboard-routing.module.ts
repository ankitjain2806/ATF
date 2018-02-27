import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {DashboardResolverService} from "./dashboard-resolver.service";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
          events: DashboardResolverService
        },
        data: {title: "Dashboard"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
