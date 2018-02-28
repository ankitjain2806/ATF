import {Component, OnInit} from '@angular/core';
import {clone} from 'lodash';
import {SuperAdminService} from "../../superadmin.service";

@Component({
  templateUrl: 'hackathon.component.html'
})

export class HackathonComponent implements OnInit {

  teams:any =null;

  constructor(private superAdminService: SuperAdminService) {
  }

  ngOnInit() {
    this.superAdminService.getHackathonRegisterdUser().subscribe(data=>{
      console.log(data);
      this.teams = data.teams;
    });
  }

  acceptRejectTeam(teamId:string, isApproved :boolean){
    this.superAdminService.acceptRejectTeam(teamId, isApproved).subscribe(data=>{
      console.log(data);
    });
  }

}
