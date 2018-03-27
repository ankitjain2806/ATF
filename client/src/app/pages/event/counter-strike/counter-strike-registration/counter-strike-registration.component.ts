import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../event.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../../../shared/util/loader.service";

@Component({
  selector : "<counter-strike-registration>",
  templateUrl : "./counter-strike-registration.component.html"
})

export class CounterStrikeRegistrationComponent implements OnInit{

  registrationForm : FormGroup;

  constructor(private _fb: FormBuilder, private eventService:EventService,
              private router: Router){
  }

  ngOnInit(){
      this.registrationForm = this._fb.group({
        slug: 'counterStrike',
        members : this._fb.array([this.initEmail()]),
        teamName: ''
      });
    }

  initEmail() {
    return this._fb.group({
      email : ['']
    });
  }

  gotoHome(){
    this.router.navigate(['event/counterstrike/home']);
  }

  onSubmit(){
    this.eventService.completeHackathonRegistration(this.registrationForm.value).subscribe(data=>{
      this.gotoHome();
    });
  }

  addMembers(){
    const control = <FormArray>this.registrationForm.controls['members'];
    control.push(this.initEmail());
  }

  removeMembers(index: number){
    const control = <FormArray>this.registrationForm.controls['members'];
    control.removeAt(index);
  }
}
