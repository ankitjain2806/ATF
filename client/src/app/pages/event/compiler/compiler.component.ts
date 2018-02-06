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
  output: string;
  languages = [
    { language : 'PHP', slug: 'php'},
    { language : 'JAVA', slug: 'java'},
    { language : 'Python', slug: 'python'}
    ]

  constructor(private fb: FormBuilder, private eventService: EventService) {
  }

  ngOnInit() {
    this.compilerForm = this.fb.group({
      code: [''],
      language: ['java'],
    });
  }

  onSubmit() {
    console.log(this.compilerForm.value)
    this.eventService.runCompilerCode(this.compilerForm.value).subscribe((res: any) => {
      this.output = res.stdout;
    })
  }
}
