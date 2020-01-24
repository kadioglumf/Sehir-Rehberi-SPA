import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, 
              private formBuilder: FormBuilder,
              private spinner:NgxSpinnerService) { }


  registerForm: FormGroup;
  registerUser: any = {};

  ngOnInit() {
    this.createRegisterForm();
    this.inputValidator();
  }


  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(18)]],
      }
    )
  }
  
  register() {
    if (this.registerForm.valid) {
      this.registerUser = Object.assign({}, this.registerForm.value)
      this.spinner.show();
      this.authService.register(this.registerUser);
      this.spinner.hide();
    }
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

  inputValidator() {
    $(document).ready(function () {
      $("input").keyup(function () {
        const id = $(this).attr("id");
        var value = $(this).val();
        if (id === "email") {
          if (value.includes("@")) {
            $(this).removeClass("input error").addClass("input");
          }
          else {
            $(this).addClass("input error");
          }
        }
        else if (id === "firstName" || id === "lastName") {
          if (value.length < 3) {
            $(this).addClass("input error");
          }
          else {
            $(this).removeClass("input error").addClass("input");
          }
        }
        else if (id === "password") {
          if (value.length < 8) {
            $(this).addClass("input error");
          }
          else {
            $(this).removeClass("input error").addClass("input");

          }
        }

      });
    });
  }

}
