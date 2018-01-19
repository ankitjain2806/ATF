import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserComponent} from './user.component'
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent,
        data: {title: "User"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
