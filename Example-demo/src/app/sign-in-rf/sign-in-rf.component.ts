import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NoWhitespaceValidator } from '../shared/validators/global';

@Component({
  selector: 'app-sign-in-rf',
  templateUrl: './sign-in-rf.component.html',
  styleUrls: ['./sign-in-rf.component.scss'],
})
export class SignInRfComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  signInForm = this.formBuilder.group({
    username: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        NoWhitespaceValidator,
        // Validators.pattern(/^[a-z]{6,32}$/i),
      ]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
      ]),
    ],
    rememberMe: false,
  });

  // username = new FormControl('', Validators.minLength(6));
  // control = this.formBuilder.control('', Validators.minLength(6));

  // signInForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  //   rememberMe: new FormControl(false),
  // });

  ngOnInit(): void {
    this.signInForm.controls.username.setValue('Doan');

    /** setValue phải set đủ tất cả các field */
    this.signInForm.setValue({
      username: 'tan doan',
      password: '123456',
      rememberMe: true,
    });

    /** patchValue có thể xét field
     * mong muốn mà không phải xét lại đầy đủ */
    this.signInForm.patchValue({
      password: 'doan123',
    });
  }

  onSubmit(): void {
    console.log(this.signInForm.value);
  }
}
