import { Component, inject, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from '../../service/location.service';
import { IApiResponseModel, ICar, ILocation } from '../../model/Car.model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-booking',
  imports: [DatePipe,CommonModule,AsyncPipe,ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {


  selectedCarId:number=0
  locationSer=inject(LocationService)
  carData:ICar={} as ICar;
  locationList$:Observable<ILocation[]>=new Observable<ILocation[]>()

  loggedUserData:any;


  constructor(private activateParam:ActivatedRoute){
    this.locationList$=this.locationSer.getAllLocation().pipe(
      map((item:IApiResponseModel)=>item.data)
    );
    this.activateParam.params.subscribe((param:any)=>{
      this.selectedCarId=param.carId;
      this.bookingForm.controls['carId'].setValue(this.selectedCarId)
      this.getCarDetailsById();
    })

    const loggedData=localStorage.getItem("zoomUser");
    if(loggedData!=null){
      this.loggedUserData=JSON.parse(loggedData)
      this.bookingForm.controls['customerId'].setValue(this.loggedUserData.userId)
    }
  }

  getCarDetailsById(){
    this.locationSer.getCarById(this.selectedCarId).subscribe((res:IApiResponseModel)=>{

      this.carData=res.data

    })
  }


  bookingForm:FormGroup=new FormGroup({
    bookingId:new FormControl(0),
    customerId:new FormControl(0),
    fromLocationId:new FormControl(0),
    toLocationId:new FormControl(""),
    travelDate:new FormControl(""),
    startTime:new FormControl(""),
    carId:new FormControl(''),
    pickUpAddress:new FormControl(''),
    alternateContactNo:new FormControl(''),
    invoiceNo:new FormControl(""),
    isComplete:new FormControl(false),
  })

  onBook(){
    const formValue=this.bookingForm.value;
    this.locationSer.saveBooking(formValue).subscribe((res:IApiResponseModel)=>{
      if(res.result){
        alert("Booking Success")
      }else{
        alert(res.message)
      }
    })
  }



}
