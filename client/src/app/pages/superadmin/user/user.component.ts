import {Component, OnInit} from '@angular/core';
import {SuperAdminService} from "../superadmin.service";
import {clone} from 'lodash';
import {IEvent} from "../../../models/event";

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})

export class UserAdminComponent implements OnInit {
  constructor(private superAdminService: SuperAdminService) {
  }

  ngOnInit(){
  }
}
