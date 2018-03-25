import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {DashboardResolverService} from "../dashboard/dashboard-resolver.service";
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        data: {title: "Home"},
        resolve: {
          events: DashboardResolverService
        },
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
