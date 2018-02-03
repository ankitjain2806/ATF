import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {EventRegistration, Member} from "../../../models/event-registration";
import {EventService} from "../event.service";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  eventSlug: string;
  constructor(private fb: FormBuilder,
              private eventService: EventService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventSlug = params['slug']
    });

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      slug: [this.eventSlug],
      teamName: ['', Validators.required],
      members: this.fb.array([
        this.initMember()
      ])
    });
  }

  initMember() {
    return this.fb.group({
      email: ['', Validators.required],
    });
  }

  addMember() {
    const control = <FormArray>this.registrationForm.controls['members'];
    control.push(this.initMember());

    console.log(this.registrationForm)
  }

  deleteMember() {
    // to be implement
  }

  onSubmit() {
    this.eventService.registerEvent(this.registrationForm.value).subscribe(() => {
    })
  }

}
