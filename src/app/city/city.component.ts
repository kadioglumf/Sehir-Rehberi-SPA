import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';
import { CityService } from '../services/city.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  constructor(private cityService: CityService,private spinner:NgxSpinnerService) { }

  cities: City[]
  ngOnInit() {
    this.spinner.show();
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
      this.spinner.hide();
    })
  }

}
