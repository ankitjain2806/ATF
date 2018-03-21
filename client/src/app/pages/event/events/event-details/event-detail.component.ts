import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {EventService} from "../../event.service";
import {IEvent} from "../../../../models/event";
import {EventDetailsResolverService} from "./event-details-resolver.service";
import {EventRegistration} from "../../../../models/event-registration";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  eventDetails: IEvent;

  constructor(private eventService: EventService, private route: ActivatedRoute, private router: Router) {
    this.route.data.subscribe((res) => {
      this.eventDetails = res.event;
    });
  }

  ngOnInit() {

  }

  eventRegistration() {
    if (this.eventDetails.memberCount > 1) {
      this.router.navigate(['/event', 'registration', this.eventDetails.slug]);
    } else {
      const registrationPayload: EventRegistration = {
        teamName : '',
        members: [],
        slug: this.eventDetails.slug
      };

      this.eventService.registerEvent(registrationPayload).subscribe((res) => {
        console.log(res.data, res, res.data == 'success')
        if(res.data == 'success') {
          this.router.navigate(['/event', this.eventDetails.slug, 'game']);
        }
      })
    }
  }
}
