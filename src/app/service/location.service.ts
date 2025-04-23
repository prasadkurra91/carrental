import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseModel } from '../model/Car.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  loggedUserData: any;
  proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  baseUrl = 'https://freeapi.miniprojectideas.com/api/ZoomCar/';

  constructor(private http: HttpClient) {
    const loggedData = localStorage.getItem("zoomUser");
    if (loggedData != null) {
      this.loggedUserData = JSON.parse(loggedData);
    }
  }

  getCarsByLocationId(locationId: number) {
    return this.http.get(this.proxyUrl + this.baseUrl + "GetAllCarsByLocation?id=" + locationId);
  }

  getAllLocation(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(this.proxyUrl + this.baseUrl + "GetAllLocations");
  }

  getCarById(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(this.proxyUrl + this.baseUrl + "GetCarById?id=" + id);
  }

  saveBooking(obj: any): Observable<IApiResponseModel> {
    return this.http.post<IApiResponseModel>(this.proxyUrl + this.baseUrl + "createNewBooking", obj);
  }

  getBookingByCustId(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(this.proxyUrl + this.baseUrl + "GetAllBookingsByCustomerId?icustomerid=" + id);
  }
}
