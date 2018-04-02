import {Component, OnInit, ViewContainerRef,} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(private titleService: Title,
              public toast: ToastsManager,
              vcr: ViewContainerRef,
              private router: Router,
              private activatedRoute: ActivatedRoute
  ) {
    this.toast.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
