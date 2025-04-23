export interface ICarList {
    brand:string
    carId:number
    imageUrl:string
    locatioinId:number
    name:string
    pricingDescription:string
    registredOn:string
    carAccessoriess: Array<{
        accessoriessId:number
        accessoriessTitle:string
        showWebsite:boolean
        carId:number
    }>
}

export interface IAccessoriess{
        accessoriessId:number
        accessoriessTitle:string
        showWebsite:boolean
        carId:number
}


export interface IApiResponseModel{
    "message":string
    "result":boolean
    "data":any
}


export interface ILocation{
    locationId:number;
    city:string;
    title:string;
    pincode:string;
}


export interface ICar{
    carId:number
    brand:string
    name:string
    pricingDescription:string
    pricing:number
    locationId:number;
    imageUrl:string;
    registredOn:string
    vehicalNo:string
    ownerUserId:number
    zoomAccessriess:IAccessoriess[]

}


export interface IBooking {
    brand: string;
    bookingNo: string;
    travelDate: string;
    departureTime: string;
    carId: number;
    imageUrl: string;
    locationId: number;
    name: string;
    carBrand: string;
    pricingDescription: string;
    locationTitle: string;
    carOwnerName: string;
    carOwnermobileNo: string;
    bookingId: number;
    isComplete: boolean;
  }
  