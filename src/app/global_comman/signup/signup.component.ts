import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { UserSignup } from 'src/app/_shared/resources/UserSignup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({

    "userName": new FormControl("", [Validators.required,Validators.maxLength(20)]),
    "password": new FormControl("", [Validators.required,Validators.maxLength(20)]),
    "email": new FormControl("", [Validators.required ,Validators.email]),
    "dob": new FormControl("", Validators.required ),
    "gender": new FormControl("", Validators.required ),
  });

  next(){
    this.router.navigate(['/select-avatar']);
  }

  onDateChange(event: any) {
    const date = event.target.value; // This will be in format "yyyy-mm-dd"
    this.dob = date; // Directly assign the formatted date
    alert(this.dob); // For debugging or further processing
  }

  constructor(public apiCallService: ApiCallService , private router: Router ,  private dataTrnfrSrvc: DataTransferService ) { }

  ngOnInit(): void {
  }

  userName : string ="";
  email : string="";
  password : string="";
  dob : string="";
  gender : string="";

  
  usrSngUp : UserSignup = {
    username : "",
    password : "",
    email : "",
    dob : "",
    gender: "",
    avatarCode : ""
  }

  signup(){

    this.usrSngUp.username =  this.userName;
    this.usrSngUp.password =  this.password;
    this.usrSngUp.email =  this.email;
    this.usrSngUp.dob =  this.dob;
    this.usrSngUp.gender =  this.gender;

    this.dataTrnfrSrvc.setData(this.usrSngUp);
    this.router.navigate(['/select-avatar']);

    /*
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.USERS.SIGNUP,this.usrSngUp).subscribe(
      (response: any) => {


        alert("you have successfully registered");
        this.router.navigate(['/login']);


      },
      (httpError: any) => {
        console.log(httpError);
        alert("incorrect username or password")
        
      }   
    );

    */
  }

}
