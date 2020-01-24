import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router) { }

  baseUrl = "https://city-guide-01.herokuapp.com";  
  path = "https://city-guide-01.herokuapp.com/users/" + this.getUserId();
  /*
    getCities(): Observable<City[]> {
      return this.httpClient.get<City[]>(this.path + "/cities");
    }
  */
  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.baseUrl + "/cities");
  }

  getCityById(cityId): Observable<City> {
    return this.httpClient.get<City>(this.baseUrl + "/cities/detail/" + cityId)
  }

  getPhotosByCity(cityId): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.baseUrl + "/cities/" + cityId + "/photos")
  }

  addCity(city) {
    this.httpClient.post(this.path + '/cities/add', city).subscribe(data => {
      this.alertifyService.success("Şehir başarıyla eklendi.")
      this.router.navigateByUrl('city-detail/'+data["id"])
    });
  }

  getUserId() {
    let userId = '';
    userId = localStorage.getItem("userId");
    return userId;
  }
}

