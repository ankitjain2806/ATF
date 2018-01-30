import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private httpClient : HttpClient) { }

  event = {};
  data = {};
  ngOnInit() {
    this.event = {
        name:'Treasure Hunt',
        description:'Hunt for treasure'
    }
  }

  registerEvent(form: NgForm) {
    this.httpClient.post('http://localhost:3000/api/events/teamRegister', form.value).subscribe(res => {
      console.log('recieved');
    });
  }
}
