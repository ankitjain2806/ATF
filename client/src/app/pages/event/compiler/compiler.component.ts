import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})
export class CompilerComponent implements OnInit {
  complierForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

}
