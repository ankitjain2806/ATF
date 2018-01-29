import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {title: "Dashboard"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
