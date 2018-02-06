import { Component, OnInit } from '@angular/core';
import {SuperAdminService} from "./superadmin.service";
import {AddEvent} from "../../models/AddEvent";
import { clone } from 'lodash';

@Component({
  moduleId: module.id,
  templateUrl: 'superadmin.component.html'
})

export class SuperAdminComponent implements OnInit {
  events: AddEvent[];
  selectedEvent : AddEvent;
  eventForm: boolean = false;
  editeventForm: boolean = false;
  isNewForm: boolean;
  newevent: any = {};
  editedevent: any = {};

  constructor(private superAdminService: SuperAdminService) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
     this.superAdminService.getAllEvents().subscribe(data => {
      console.log(data);
      this.events = data;
    });
  }

  showEditEventForm(event: AddEvent) {
    if(!event) {
      this.eventForm = false;
      return;
    }
    this.editeventForm = true;
    this.editedevent = clone(event);
  }

  showAddEventForm() {
    // resets form if edited event
    if(this.events.length) {
      this.newevent = {};
    }
    this.eventForm = true;
    this.isNewForm = true;
  }

  saveEvent(event: any) {
    if(this.isNewForm) {
      // add a new event

      this.selectedEvent =Object.assign({},event);
      this.superAdminService.addEvent(this.selectedEvent).subscribe(() => {
        this.getEvents();
      });
    }
    this.eventForm = false;
  }

  removeEvent(event: any) {
    this.selectedEvent =Object.assign({},event);
    this.superAdminService.deleteEvent(event).subscribe(() =>{
      this.getEvents();
    });
  }

  updateEvent() {
    this.superAdminService.updateEvent(this.editedevent).subscribe(() =>{
      this.getEvents();
    });
    this.editeventForm = false;
    this.editedevent = {};
  }

  cancelNewEvent() {
    this.newevent = {};
    this.eventForm = false;
  }

  cancelEdits() {
    this.editedevent = {};
    this.editeventForm = false;
  }

}
