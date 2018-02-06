import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import {EventService} from "../event.service";

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss']
})
export class CompilerComponent implements OnInit {
  compilerForm: FormGroup;

  constructor(private fb: FormBuilder, private eventService: EventService) {
  }

  ngOnInit() {
    this.compilerForm = this.fb.group({
      code: [''],
      language: ['java'],
    });
  }

  onSubmit() {
    this.eventService.runCompilerCode(this.compilerForm.value).subscribe((res) => {
      alert(res)
    })
  }
}
