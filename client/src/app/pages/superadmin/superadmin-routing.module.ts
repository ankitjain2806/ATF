import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SuperAdminComponent} from "./superadmin.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'superadmin',
        component: SuperAdminComponent,
        data: {title: "SuperAdmin"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule {
}
