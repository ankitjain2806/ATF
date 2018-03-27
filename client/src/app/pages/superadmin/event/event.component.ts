import {Component, OnInit} from '@angular/core';
import {SuperAdminService} from "../superadmin.service";
import {clone} from 'lodash';
import {IEvent} from "../../../models/event";
import {LoaderService} from "../../../shared/util/loader.service";

@Component({
  moduleId: module.id,
  templateUrl: 'event.component.html'
})

export class EventAdminComponent implements OnInit {
  events: IEvent[];
  selectedEvent: IEvent;
  eventForm: boolean = false;
  editEventForm: boolean = false;
  isNewForm: boolean;
  newEvent: any = {};
  editedEvent: any = {};

  constructor(private superAdminService: SuperAdminService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.superAdminService.getAllEvents().subscribe(data => {
      console.log(data);
      this.events = data;
    });
  }

  showEditEventForm(event: IEvent) {
    if (!event) {
      this.eventForm = false;
      return;
    }
    this.editEventForm = true;
    this.editedEvent = clone(event);
  }

  showAddEventForm() {
    // resets form if edited event
    if (this.events.length) {
      this.newEvent = {};
    }
    this.eventForm = true;
    this.isNewForm = true;
  }

  saveEvent(event: any) {
    if (this.isNewForm) {
      // add a new event

      this.selectedEvent = Object.assign({}, event);
      this.superAdminService.addEvent(this.selectedEvent).subscribe(() => {
        this.getEvents();
      });
    }
    this.eventForm = false;
  }

  removeEvent(event: any) {
    this.selectedEvent = Object.assign({}, event);
    this.superAdminService.deleteEvent(event).subscribe(() => {
      this.getEvents();
    });
  }

  updateEvent() {
    this.superAdminService.updateEvent(this.editedEvent).subscribe(() => {
      this.getEvents();
    });
    this.editEventForm = false;
    this.editedEvent = {};
  }

  cancelNewEvent() {
    this.newEvent = {};
    this.eventForm = false;
  }

  cancelEdits() {
    this.editedEvent = {};
    this.editEventForm = false;
  }

}
