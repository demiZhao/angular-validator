import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = /angular/gm.test(control.value);
    return isValid ? null : { name: true };
  };
}

export function rangeValidation(): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const from = Number(form.get('from')?.value);
    const to = Number(form.get('to')?.value);
    return  from >= to ? {range: true} : null;
  };
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  
  validationForm = this.fb.group({
    name: ['', [nameValidator()]],
    from: ['', [Validators.required]],
    to: ['', [Validators.required]]
  }, {
    validators: [rangeValidation()]
  });

  constructor(private fb: FormBuilder) {}

  get name() { return this.validationForm.get('name'); }

}
