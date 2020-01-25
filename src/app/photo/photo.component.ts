import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload'
import { AlertifyService } from '../services/alertify.service'
import { AuthService } from '../services/auth.service'
import { ActivatedRoute, Router, NavigationStart } from '@angular/router'
import { Photo } from '../models/photo'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})


export class PhotoComponent implements OnInit {

  constructor(private authService: AuthService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute,
    private spinner:NgxSpinnerService
      ) { }

  photos: Photo[] = [];
  uploader: FileUploader;
  baseUrl = 'http://localhost:8080/users/';
  currentMain: Photo;
  currentCity: any;
  currentUser: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentCity = params["cityId"]
    });
    this.currentUser = localStorage.getItem("userId");

    this.initializeUploader();
  }

  
  uploadPhoto() {
    this.uploader.uploadAll();
    this.spinner.show();
    setTimeout(function(){
      location.reload(true);
    },4000)
    // location.reload(true);
  }


  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + this.currentUser + '/cities/' + this.currentCity + '/photos/upload',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      
      if (response) {
       
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          isMain: res.isMain,
          cityId: res.cityId
        }
        this.photos.push(photo)
      }
    }

  }



}
