import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NumberOnlyDirective } from './number-only.directive';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NumberOnlyDirective,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  FormData!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.FormData = this.formBuilder.group({
      quantities: this.formBuilder.array([this.formBuilder.control(null)]),
    });
  }

  onSubmit(formData: any) {
    console.log('formData: ', formData);
  }

  addItem() {
    (this.FormData.get('quantities') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  deleteItem(index: any) {
    (this.FormData.get('quantities') as FormArray).removeAt(index);
  }

  getQuantities(): AbstractControl[] {
    return (<FormArray>this.FormData.get('quantities')).controls;
  }
}
