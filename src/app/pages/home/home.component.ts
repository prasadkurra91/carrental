import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../service/location.service';
import { IApiResponseModel, ILocation } from '../../model/Car.model';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit ,OnDestroy{

  selectedLocation:string="";
  locationService=inject(LocationService);
  locationArray:ILocation[]=[];
  subscriptionList:Subscription[]=[]

  ngOnInit(): void {

    this.getLocation()
    
  }

  getLocation(){
    let location=this.locationService.getAllLocation().subscribe((res:IApiResponseModel)=>{
      this.locationArray=res.data
    })
    this.subscriptionList.push(location)
  }

  ngOnDestroy(): void {

    this.subscriptionList.forEach(e=>{
      e.unsubscribe()
    })
    
  };
}
