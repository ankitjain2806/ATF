import {Component, Input, OnInit} from '@angular/core';
import {SuperAdminService} from "../superadmin.service";
import {clone} from 'lodash';
import {IEvent} from "../../../models/event";
import {LoaderService} from "../../../shared/util/loader.service";

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

  constructor(private superAdminService: SuperAdminService,
              private loader: LoaderService) {
  }

  ngOnInit(){
    this.loader.showLoader();
    this.superAdminService.getAllUsers().subscribe(data =>{
       this.users = data;
       this.loader.hideLoader();
    },error2 => {
      this.loader.hideLoader();
    });
  }

  getAllEvents(userId:string){
    this.loader.showLoader();
    this.superAdminService.getEventByUserId(userId).subscribe(data =>{
      console.log(data);
      this.isUserSelected = true;
      this.events = this.x;
      this.selectedUserId = userId;
      this.loader.hideLoader();
    },error2 => {
      this.loader.hideLoader();
    });
  }

  blockEvent(eventId:string){
    this.loader.showLoader()
      this.superAdminService.blockEvent(this.selectedUserId, eventId).subscribe(data =>{
        this.loader.hideLoader();
      }, error2 => {
        this.loader.hideLoader();
      });
  }
}
