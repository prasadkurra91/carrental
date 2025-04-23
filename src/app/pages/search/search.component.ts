import { Component, inject } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { ICarList } from '../../model/Car.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {


  currentLocationId=0;


  locationService=inject(LocationService)
  carList:ICarList []=[];
  constructor(private r:Router,private activateRoute:ActivatedRoute,){
    this.activateRoute.params.subscribe((param:any)=>{
      this.currentLocationId=param.locationId;
      this.getCarsByLocation();
    })

  }


  getCarsByLocation(){
    this.locationService.getCarsByLocationId(this.currentLocationId).subscribe((res:any)=>{
      this.carList=res.data;
    })
  }



  navigateToBooking(carId:number){
    this.r.navigate(["/booking",carId])
  }

}
