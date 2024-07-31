import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { UserSignup } from 'src/app/_shared/resources/UserSignup';

interface Avatar {
  code: string;
  path: string;
  selected: boolean;
}



@Component({
  selector: 'app-selectavatar',
  templateUrl: './selectavatar.component.html',
  styleUrls: ['./selectavatar.component.css']
})
export class SelectavatarComponent implements OnInit {

  isDisabled = true;
  avatarCode : string ="";

  constructor(public apiCallService: ApiCallService, private router: Router ,  private dataTrnfrSrvc: DataTransferService  ) { }

  usrSngUp : UserSignup = {
    username : "",
    password : "",
    email : "",
    dob : "",
    gender: "",
    avatarCode : ""
  }

  public  avatars: Avatar[] = [
    { code: 'AVTR01', path: 'assets/photos/avatars/avtr01.jpg' , selected: false},
    { code: 'AVTR02', path: 'assets/photos/avatars/avtr02.jpg', selected: false },
    { code: 'AVTR03', path: 'assets/photos/avatars/avtr03.jpg' , selected: false},
    { code: 'AVTR04', path: 'assets/photos/avatars/avtr04.jpg', selected: false }
  ];

  ngOnInit(): void {

    this.dataTrnfrSrvc.data$.subscribe(data => {
      alert(data);
      this.usrSngUp = data;
    });

    //alert(this.usrSngUp.username);
  }

  selectImage(avtr:any){

    for (let j = 0; j < this.avatars.length; j++) {
      //console.log("Allowed Role - "+ allowedRoles.length+ " + "+ allowedRoles[j]);
      if (this.avatars[j].code !== avtr.code) {
      // alert("came")
        this.avatars[j].selected = false;
      }
    }
    this.avatarCode = avtr.code;
    avtr.selected = true;
  }


  submit(){
    this.usrSngUp.avatarCode = this.avatarCode;
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
  }

}
