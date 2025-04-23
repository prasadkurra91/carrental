import { Component, inject, OnInit } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { IBooking } from '../../model/Car.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  imports: [DatePipe],
  templateUrl: './my-booking.component.html',
  styleUrl: './my-booking.component.css'
})
export class MyBookingComponent implements OnInit {

  locationServ=inject (LocationService);
  myBookingList:IBooking[]=[]

  ngOnInit(): void {
    this.getMyBookings()
  }

  getMyBookings(){
    this.locationServ.getBookingByCustId(this.locationServ.loggedUserData.userId).subscribe((res:any)=>{
        this.myBookingList=res.data
    })
  }
}
