import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { City } from 'src/app/models/city';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers: [CityService]
})
export class CityAddComponent implements OnInit {

  constructor(private cityService: CityService,
              private formBuilder: FormBuilder,
              private authService : AuthService
  ) { }

  city: City;
  cityAddForm: FormGroup;
  baseUrl: 'http://localhost:8080/users/';
  currentUser:any;
  uploader:FileUploader;

  ngOnInit() {
    this.createCityForm();
  }

  createCityForm() {
    this.cityAddForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        description: ["", Validators.required]
      })
  }

  addCity() {
    if (this.cityAddForm.valid) {
      this.city = Object.assign({}, this.cityAddForm.value);
      this.city.user_id = this.authService.userId;
      this.cityService.addCity(this.city);
    }
  }

}
