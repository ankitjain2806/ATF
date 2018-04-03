import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../event.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-hackathon-registration',
  templateUrl: './hackathon-registration.component.html',
  styleUrls: ['./hackathon-registration.component.scss']
})

export class HackathonRegistrationComponent implements OnInit {

  public resourceForm: FormGroup;
  events : any = null;
  isTeamNameAvailable = true;
  constructor(
    private _fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe((res) => {
      if(res.team.data.length > 0) {
        this.router.navigate(['/hackathon/my-team']);
      }
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.resourceForm = this._fb.group({
      members:this._fb.array([this.initGitIds()]),
      idea:['',Validators.required],
      resources: this._fb.array([this.initResources()]),
      isApproved:false,
      teamName : ['',Validators.required],
      slug : 'hackathon',
      userGitId : ['',Validators.required]
    });
  }

  initGitIds() {
    return this._fb.group({
      email : ['',Validators.email],
      gitId:['',Validators.required]
    });
  }

  initResources() {
    return this._fb.group({
      resource: [''],
    });
  }

  addNewRow(formField:string) {
    const control = <FormArray>this.resourceForm.controls[formField];
    if(formField === 'resources') {
      control.push(this.initResources());
    }
    else if(formField === 'members'){
      control.push(this.initGitIds());
    }
  }

  deleteRow(index: number, formField: string) {
    const control = <FormArray>this.resourceForm.controls[formField];
    control.removeAt(index);
  }

  completeRegistration(resourceForm: any){
    this.eventService.completeHackathonRegistration(resourceForm).subscribe(data=>{
      this.router.navigate(['/hackathon/my-team']);
    })
  }

  checkTeamName(){
    this.eventService.checkTeamName(this.resourceForm.value.teamName).subscribe(data=>{
        this.isTeamNameAvailable = data.isAvailable;
    });
  }
}
