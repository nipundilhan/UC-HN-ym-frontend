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

  errorMessage: string = ''; // To store error message for incorrect login
  isPasswordVisible: boolean = false;

  constructor(    
    private userAuthService: UserAuthService ,  
    public apiCallService: ApiCallService ,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.errorMessage = ''; // Reset error message on each submit attempt

    if (loginForm.value.username) {
      loginForm.value.username = loginForm.value.username.toLowerCase();
    }
    
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.AUTH.AUTHENTICATE, loginForm.value).subscribe(
      (response: any) => {
        // On successful login, store token and role
        this.userAuthService.setRole(response.user.role);
        this.userAuthService.setUser(response.user);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setUserName(response.user.username);
        this.userAuthService.setUserId(response.user.userId);

        // Navigate based on user role
        const role = response.user.role;
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'STUDENT') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (httpError: any) => {
        // Check for specific backend errors
        if (httpError.status === 401) {
          this.errorMessage = 'Incorrect username or password. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }


    signup(){
      this.router.navigate(['/signup']);
    }

    togglePasswordVisibility(field: string) {
      if (field === 'password') {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

}

onUsernameInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input) {
    input.value = input.value.toLowerCase();  // Directly update input value to lowercase
  }
}
}
