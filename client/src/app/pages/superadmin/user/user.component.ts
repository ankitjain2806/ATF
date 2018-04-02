import {Component, Input, OnInit} from '@angular/core';
import {SuperAdminService} from "../superadmin.service";
import {clone} from 'lodash';
import {IEvent} from "../../../models/event";

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserAdminComponent implements OnInit {
  users:any = null;
  isUserSelected :boolean = false;
  selectedUserId:string = null;
  events :any = null;
  x = {"events" : [
    {
      "id" : "ObjectId(\"5a709b9f21020f234c82febd\")",
      "isBlocked" : false,
      "name":"Treasure Hunt"
    },
    {
      "id" : "ObjectId(\"5a709b9f21020f234c82febd\")",
      "isBlocked" : true,
      "name": "Compiler"
    }
    ]};

  constructor(private superAdminService: SuperAdminService) {
  }

  ngOnInit(){
    this.superAdminService.getAllUsers().subscribe(data =>{
       this.users = data;
    });
  }

  getAllEvents(userId:string){
    this.superAdminService.getEventByUserId(userId).subscribe(data =>{
      console.log(data);
      this.isUserSelected = true;
      this.events = this.x;
      this.selectedUserId = userId;
    });
  }

  blockEvent(eventId:string){
      this.superAdminService.blockEvent(this.selectedUserId, eventId).subscribe(data =>{
      });
  }
}
