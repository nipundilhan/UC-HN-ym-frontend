import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(    private userAuthService: UserAuthService ,  public apiCallService: ApiCallService ,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm : NgForm) {

    console.log("login form values - "+loginForm.value);

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.AUTH.AUTHENTICATE,loginForm.value).subscribe(
      (response: any) => {

        this.userAuthService.setRole(response.user.role);
        this.userAuthService.setUser(response.user);

        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUserName(response.user.username);
        this.userAuthService.setUserId(response.user.userId);
        
        const role = response.user.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/home']);
        } else if (role === 'STUDENT') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        } 

      },
      (httpError: any) => {
        console.log(httpError);
        alert("incorrect username or password")
        
      }   
    );

    }
    signup(){
      this.router.navigate(['/signup']);
    }

}
