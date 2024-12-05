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
  name: string;
  description: string;
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
    // { code: 'default', path: 'assets/avatar-img/default-avatar.png', selected: false }, // Default avatar
    { code: 'AVTR01', path: 'assets/avatar-img/ava01.png', selected: false, name: 'Isis', description: 'The benevolent goddess of magic and healing.'},
    { code: 'AVTR02', path: 'assets/avatar-img/ava02.png', selected: false, name: 'Amun', description: 'The hidden one, a god of creation and kingship.' },
    { code: 'AVTR03', path: 'assets/avatar-img/ava03.png', selected: false, name: 'Anubis', description: 'The guardian of the dead, known for his wisdom and calm judgment.' },
    { code: 'AVTR04', path: 'assets/avatar-img/ava04.png', selected: false, name: 'Thoth', description: 'The god of wisdom, writing, and the moon.'},
    { code: 'AVTR05', path: 'assets/avatar-img/ava05.png', selected: false, name: 'Ra', description: 'The sun god, bringer of light and life.' },
    { code: 'AVTR06', path: 'assets/avatar-img/ava06.png', selected: false, name: 'Osiris', description: 'The ruler of the underworld and symbol of renewal.' },
    { code: 'AVTR07', path: 'assets/avatar-img/ava07.png', selected: false, name: 'Horus', description: 'The falcon-headed god of the sky and protector of Egypt.' },
    { code: 'AVTR08', path: 'assets/avatar-img/ava08.png', selected: false, name: 'Bastet', description: 'The feline goddess of home and protection, revered for her playful yet fierce nature.'  }
  ];


  defaultAvatar = {
    code: 'default',
    path: 'assets/avatar-img/default-avatar.png'
  };

  ngOnInit(): void {

    this.dataTrnfrSrvc.data$.subscribe(data => {
      //alert(data);
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


  // Skip method to assign the default avatar code only
  skipAvatar() {
    this.avatarCode = this.defaultAvatar.code; // Assign the "default" code

    // Proceed to submit with the default avatar code
    this.submit();
  }

  submit(){
    if (!this.avatarCode) {
      alert('Please select an avatar or skip to proceed');
      return;
    }

    this.usrSngUp.avatarCode = this.avatarCode;
    
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.USERS.SIGNUP,this.usrSngUp).subscribe(
      (response: any) => {


        // alert("you have successfully registered");
        this.router.navigate(['/welcome']);
        


      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred during registration");        
      }   
    );
  }

}
