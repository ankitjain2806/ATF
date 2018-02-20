import {Component, Input, OnInit} from '@angular/core';
import {SuperAdminService} from "../superadmin.service";
import {clone} from 'lodash';

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})

export class AdminComponent implements OnInit {

  constructor(private superAdminService: SuperAdminService) {
  }

  ngOnInit(){

  }
}
