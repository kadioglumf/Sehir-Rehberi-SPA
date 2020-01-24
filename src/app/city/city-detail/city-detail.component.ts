import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Photo } from '../../models/photo';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private cityService: CityService,
              private authService: AuthService,
              private spinner:NgxSpinnerService) { }

  city: City;
  photos: Photo[] = []
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCityById(params["cityId"]);
    })
  }

  getCityById(cityId) {
    this.spinner.show();
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
      this.getPhotosByCity(cityId);
    })
  }

  getPhotosByCity(cityId) {
    this.cityService.getPhotosByCity(cityId).subscribe(data => {
      this.photos = data;
      this.setGallery();
      this.spinner.hide();
    })
  }

  getImages() {
    const imageUrls = []
    for (let i = 0; i < this.city.photos.length; i++) {
      imageUrls.push({
        small: this.city.photos[i].url,
        medium: this.city.photos[i].url,
        big: this.city.photos[i].url
      })
    }
    return imageUrls;
  }
  setGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getImages()

  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }

}
