import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  @ViewChild("loginModal") loginModel!:ElementRef;
  formVisiable=signal<string>("LoginForm")

  loggedUserData:any;

  registerObj:any={
    "userId":0,
    "name":"asdf",
    "userRole":"customer",
    "emailId":"",
    "mobileNo":"asdf",
    "password":"",
    "createdOn":new Date()

  }

  ngOnInit(): void {
    const loggedData=localStorage.getItem("zoomUser")
    if(loggedData!=null){
      this.loggedUserData=JSON.parse(loggedData)
    }
  }
  
  openModal(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display="block"
    }
  }

  closeModal(){
    if(this.loginModel){
      this.loginModel.nativeElement.style.display="none"
    }
  }

  toggleForm(form:string){
    this.formVisiable.set(form)
  }




  http=inject(HttpClient)


  onRegister(){
    this.http.post("https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ZoomCar/AddNewUser",this.registerObj).subscribe((res:any)=>{
      if(res.result){
        alert("User Registration Success")
        this.closeModal()
        this.registerObj={
          "userId":0,
          "name":"",
          "userRole":"customer",
          "emailId":"",
          "mobileNo":"",
          "password":"",
          "createdOn":new Date()
      
        }
      }else{
        alert(res.message)
      }
    })
  }

  onLogin(){
    this.http.post("https://cors-anywhere.herokuapp.com/https://freeapi.miniprojectideas.com/api/ZoomCar/Login",this.registerObj).subscribe((res:any)=>{
      if(res.result){
        alert("Login Successfull")
        this.closeModal()
        this.loggedUserData=res.data
        localStorage.setItem('zoomUser',JSON.stringify(res.data))
        this.registerObj={
          "userId":0,
          "name":"",
          "userRole":"customer",
          "emailId":"",
          "mobileNo":"",
          "password":"",
          "createdOn":new Date()
        }
      }else{
        alert(res.message)
      }
    })
  }


  
  logout(){
    localStorage.removeItem("zoomUser");
    this.loggedUserData=undefined

  }

 
}
