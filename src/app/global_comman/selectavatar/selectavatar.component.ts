import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
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

  isSkipped = false;
  showErrorMessage = false;
  errorMessage: string = ''; // To store error message for incorrect login
  isDisabled = true;
  avatarCode : string ="";
  
  constructor(public apiCallService: ApiCallService, private router: Router ,     private userAuthService: UserAuthService ,  private dataTrnfrSrvc: DataTransferService  ) { }

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

  selectImage(avtr: any) {
    for (let j = 0; j < this.avatars.length; j++) {
      if (this.avatars[j].code !== avtr.code) {
        this.avatars[j].selected = false;
      }
    }
    this.avatarCode = avtr.code;
    avtr.selected = true;
    this.showErrorMessage = false; // Hide error message when an avatar is selected
  }


  // Skip method to assign the default avatar code only
  skipAvatar() {
    this.avatarCode = this.defaultAvatar.code; // Assign the "default" code
    this.isSkipped = true;
    this.showErrorMessage = false; // Hide error message when skipped
    this.submit();  // Proceed to submit
  }

  submit(){
    if (!this.avatarCode) {
      this.showErrorMessage = true;  // Show error message if no avatar is selected
      return;
    }

    this.usrSngUp.avatarCode = this.avatarCode;
    
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.USERS.SIGNUP,this.usrSngUp).subscribe(
      (response: any) => {


        // alert("you have successfully registered");
        this.router.navigate(['/welcome']);
        


      },
      (httpError: any) => {
        if (httpError.status === 400) {
          this.errorMessage = httpError.error.message;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
  
  goBack(){
    this.router.navigate(['/signup']);
  }

}
