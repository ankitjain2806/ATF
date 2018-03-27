import {Component, OnInit} from '@angular/core';
import {clone} from 'lodash';
import {SuperAdminService} from "../../superadmin.service";
import {LoaderService} from "../../../../shared/util/loader.service";

@Component({
  templateUrl: 'hackathon.component.html',
  styleUrls : ['hackathon.component.scss']
})

export class HackathonComponent implements OnInit {

  teams:any =null;
  teamDetail  = null;
  selectedRow = null;
  constructor(private superAdminService: SuperAdminService) {
  }

  ngOnInit() {
    this.superAdminService.getHackathonRegisterdUser().subscribe((teams)=>{
      this.teams = teams.data;
    });
  }

  acceptRejectTeam(teamId:string, isApproved :boolean){
    this.superAdminService.acceptRejectTeam(teamId, isApproved).subscribe((data)=>{
      console.log(data);
    });
  }

  getTeamDetails(teamId:string, index:number){
    this.superAdminService.getTeamInfoById(teamId).subscribe(data=>{
      console.log(data);
      this.teamDetail = data;
      this.selectedRow = index;
    });
  }
}
