import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService,private formBuilder:FormBuilder) { }

  registerForm:FormGroup;
  registerUser:any={};

  ngOnInit() {
    this.createRegisterFrom();
  }

  createRegisterFrom(){
    this.registerForm = this.formBuilder.group(
      {
        username:["",Validators.required],
        password:["",[Validators.required,Validators.minLength(4),Validators.maxLength(18)]],
        confirm_password:["",Validators.required]
      },
      {validator:this.passwordMatchValidator}
    )
  }

  passwordMatchValidator(g:FormGroup){
    return g.get("password").value === g.get("confirm_password").value ?null:{missMatch:true};
  }

  register(){
    if(this.registerForm.valid){
      this.registerUser = Object.assign({},this.registerForm.value)
      this.authService.register(this.registerUser);
    }
  }

}
