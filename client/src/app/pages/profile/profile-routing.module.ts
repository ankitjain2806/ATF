import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component'
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path:'profile',
        component: ProfileComponent,
        data: {title: "Profile"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule{
}