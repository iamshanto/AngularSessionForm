import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

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
    });

    this.userForm.addControl('password', new FormControl('', [Validators.required]));
    this.userForm.addControl('confirmPassword', new FormControl('', [Validators.required, this.passwordMatch.bind(this)]));
  }

  onSubmit(){
    console.log(this.userForm);
  }

  validateEmail(c:FormControl) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
