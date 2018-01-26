import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'home',
        component: HomeComponent,
        data: {title: "Home"}
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
