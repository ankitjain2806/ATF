import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {EventService} from "../../event.service";
import {SocketService} from "../../../../shared/util/socket.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-compiler-intro',
  templateUrl: './compiler-intro.component.html',
  styleUrls: ['./compiler-intro.component.scss']
})
export class CompilerIntroComponent implements OnInit {
  resources;
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.resources = res.resources.data;
    });
  }

  ngOnInit() {

  }

}
