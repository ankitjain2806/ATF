import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EventService} from "../../event.service";
import {IEvent} from "../../../../models/event";
import {EventDetailsResolverService} from "./event-details-resolver.service";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  eventDetails: IEvent;
  constructor(private eventService: EventService, private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.eventDetails = res.resources;
    });
  }
  ngOnInit() {

  }
}
