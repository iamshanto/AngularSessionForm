import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm;
  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      'username': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, this.validateEmail]),
      'contactNumbers': new FormArray([UserComponent.getPhoneNumberFormGroup()]),
    });

    this.userForm.addControl('password', new FormControl('', [Validators.required]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, this.passwordMatch.bind(this)]));
  }

  addContactNumber() {
    this.userForm.get("contactNumbers").push(UserComponent.getPhoneNumberFormGroup());
  }

  private static getPhoneNumberFormGroup() {
    return new FormGroup({
      'number': new FormControl('', [Validators.required]),
      'type': new FormControl('', [Validators.required]),
    });
  }

  removePhoneNumber(i) {
    this.userForm.get("contactNumbers").removeAt(i);
  }

  onSubmit(){
    console.log(this.userForm);
  }

  validateEmail(c:FormControl) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(c.value)) {
      return {email: 'Invalid Email'};
    }

    return null;
  }

  passwordMatch(c) {
    if (this.userForm.get('password').value != c.value) {
      return {passwordMismatch: true}
    }

    return null;
  }
}
