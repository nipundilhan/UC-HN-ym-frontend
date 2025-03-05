import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {


  otp = '';
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showSuccessScreen = false;
  isPasswordVisible: boolean = false;

  constructor(public router: Router, public apiCallService: ApiCallService) {}
ngOnInit(): void {
}

resetPassword() {
    if (!this.otp || !this.username || !this.password || this.password.length < 6) {
      this.errorMessage = 'All fields are required, and password must be at least 6 characters';
      return;
    }
    this.isLoading = true;
    const requestBody = {
      username: this.username,
      otp: this.otp,
      newPassword: this.password,
    };
    this.apiCallService.executePutNoAuth(API_ENDPOINTS.USERS.PASSWORD_EMAIL, requestBody).subscribe(
      (response: any) => {
        this.isLoading = false;
        this.successMessage = 'Password successfully reset!';
        this.showSuccessScreen = true;
      },
      (httpError: any) => {
        this.isLoading = false;
        this.errorMessage = httpError.error?.message || 'An error occurred. Please try again later.';
      }
    );
  }

  sendOTPAgain() {
    this.router.navigate(['/forgot-password']);
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
  }

}
  
}
