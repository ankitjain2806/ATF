import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../event.service";
import {LoaderService} from "../../../shared/util/loader.service";

@Component({
  selector: 'app-event-end',
  templateUrl: './event-end.component.html',
  styleUrls: ['./event-end.component.scss']
})
export class EventEndComponent implements OnInit {

  data;
  eventName : string = "Event";

  constructor(private service: EventService,
              private route: ActivatedRoute,
              private loaderService: LoaderService) {
      this.route.params.subscribe(routeParams => {
      this.eventName = routeParams.eventName + "Event";
      },error => {
        this.loaderService.hideLoader();
      })
  }

  ngOnInit() {
    const slug = this.route.params['slug'];
    this.service.getEventEndDetail(slug).subscribe((response) => {
      this.data = response;
    });
  }

}
