import {Component, ViewContainerRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private titleService: Title,
              public toast: ToastsManager,
              vcr: ViewContainerRef,
              private route: ActivatedRoute) {
    this.toast.setRootViewContainerRef(vcr);

  }
}
