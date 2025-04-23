import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseModel } from '../model/Car.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  loggedUserData:any;

  constructor(private http:HttpClient) {
    const loggedData=localStorage.getItem("zoomUser");
    if(loggedData!=null){
      this.loggedUserData=JSON.parse(loggedData)
     
    }
   }


  getCarsByLocationId(locationId:number){
    return this.http.get("https://freeapi.miniprojectideas.com/api/ZoomCar/GetAllCarsByLocation?id="+locationId)
  }


  getAllLocation():Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>("https://freeapi.miniprojectideas.com/api/ZoomCar/GetAllLocations")
  }

  getCarById(id:number):Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>("https://freeapi.miniprojectideas.com/api/ZoomCar/GetCarById?id="+id)
  }

  saveBooking(obj:any):Observable<IApiResponseModel>{
    return this.http.post<IApiResponseModel>("https://freeapi.miniprojectideas.com/api/ZoomCar/createNewBooking",obj)

  }


  getBookingByCustId(id:number):Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>("https://freeapi.miniprojectideas.com/api/ZoomCar/GetAllBookingsByCustomerId?icustomerid="+id)
  }
}

