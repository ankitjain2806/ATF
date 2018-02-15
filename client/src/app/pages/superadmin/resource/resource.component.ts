import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {SuperAdminService} from "../superadmin.service";

@Component({
  selector: 'my-resource',
  template: `
    <div class="col-md-4 offset-md-3">
    <h3 class="page-header">Add Resource</h3>
    <form [formGroup]="resourceForm" (ngSubmit)="addResource(resourceForm.value)">
      <label>Name</label>
      <input formControlName="name" class="form-control" required>
      <label>Body</label>
      <textarea formControlName="body" class="form-control" required></textarea>
      <div class="row">
        <input type="checkbox" formControlName="isActive" class="form-control col-md-2">
        <label class="col-md-3">Active</label>
      </div>
      <div formArrayName="testCases">
        <div *ngFor="let itemrow of resourceForm['controls'].testCases['controls']; let i=index" [formGroupName]="i">
          <h4>Test Case #{{ i + 1 }}</h4>
          <div class="form-group">
            <label>Input</label>
            <input formControlName="stdin" class="form-control">
            <label>Output</label>
            <input formControlName="stdout" class="form-control">
          </div>
          <button *ngIf="resourceForm.controls.testCases.controls.length > 1" (click)="deleteRow(i)" class="btn btn-danger">Delete Test Case</button>
        </div>
      </div>
      <div class="offset-md-4">
        <i type="button" class="fa fa-plus" (click)="addNewRow()" data-toggle="tooltip" title="Add New Test Case!"></i><br>
      </div>
      <div class="offset-md-3">
        <button type="submit" class="btn btn-primary">Add Resource</button>
      </div>
    </form>
   </div>
  `,
})
export class ResourceComponent implements OnInit {
  public resourceForm: FormGroup;
  events : any = null;

  constructor(private _fb: FormBuilder, private superAdminService: SuperAdminService) { }

  ngOnInit() {
      this.initForm();
  }

  initForm(){
    this.resourceForm = this._fb.group({
      name:'',
      body:'',
      eventId:'',
      testCases: this._fb.array([this.initTestCases()])
    });
  }

  initTestCases() {
    return this._fb.group({
      stdin: [''],
      stdout:['']
    });
  }

  addNewRow() {
    const control = <FormArray>this.resourceForm.controls['testCases'];
    control.push(this.initTestCases());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.resourceForm.controls['testCases'];
    control.removeAt(index);
  }

  addResource(resourceForm: any){
     this.superAdminService.addResource(resourceForm).subscribe(data =>{
      console.log("Added");
      console.log(data);
      this.initForm();
     })
  }
}
