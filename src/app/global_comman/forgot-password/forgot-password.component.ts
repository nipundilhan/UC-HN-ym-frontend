import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router, public apiCallService: ApiCallService) {}



  ngOnInit(): void {
  }

  
  sendOTP() {
    if (!this.email || !this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }
    this.isLoading = true;
    // setTimeout(() => {
      // this.isLoading = false;
  
       this.apiCallService.executeGetNoAuth(API_ENDPOINTS.USERS.SEND_OTP_EMAIL + "/"+ this.email)
            .subscribe(
              response => {
                this.isLoading = false;
                this.router.navigate(['/reset-password']);
              },
              (httpError: any) => {
                this.isLoading = false;
                this.errorMessage = httpError.error?.message || 'An error occurred. Please try again later.';
              }
            );
      // this.router.navigate(['/reset-password']);
    // }, 100);
  }

  validateEmail(email: string): boolean {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return re.test(email);
  }


}
