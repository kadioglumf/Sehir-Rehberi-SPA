import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  photos:Photo[];

  ngOnInit() {
    this.getValues().subscribe(data=>{
      this.photos = data
    })
  }
  
  getValues(){
    return this.httpClient.get<Photo[]>("http://localhost:8080/api/photos")
  }

}
