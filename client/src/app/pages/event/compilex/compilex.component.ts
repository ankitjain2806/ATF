import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-compilex',
  templateUrl: './compilex.component.html',
  styleUrls: ['./compilex.component.scss']
})
export class CompilexComponent implements OnInit {
  complierForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
