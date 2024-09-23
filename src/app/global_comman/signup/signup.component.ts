import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { UserSignup } from 'src/app/_shared/resources/UserSignup';

import Validation from '../../utils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup(
    
  //   {
  //   username: new FormControl("", [Validators.required, Validators.maxLength(20)]),
  //   email: new FormControl("", [Validators.required, Validators.email]),
  //   dob: new FormControl("", [Validators.required, this.dateValidator()]),
  //   gender: new FormControl("", Validators.required),
  //   password: new FormControl("", [Validators.required, Validators.maxLength(20)]),
  //   confirmPassword: new FormControl("", [Validators.required, Validators.maxLength(20)])
  // });

  {
    // fullname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    // acceptTerms: new FormControl(false),
  });

  submitted = false;

  
  username: string = "";
  email: string = "";
  password: string = "";
  dob: string = "";
  gender: string = "";
  confirmPassword: string = "";



  constructor(public apiCallService: ApiCallService, private router: Router, private dataTrnfrSrvc: DataTransferService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const today = new Date().toISOString().split('T')[0]; // Current date in yyyy-mm-dd format

    
      this.form = this.formBuilder.group(
        {
          // fullname: ['', Validators.required],
          username: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ],
          ],
          email: ['', [Validators.required, Validators.email]],
          gender: ['', Validators.required],
          dob: ['', [Validators.required, this.dateValidator(today)]],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40),
            ],
          ],
          confirmPassword: ['', Validators.required],
          // acceptTerms: [false, Validators.requiredTrue],
        },
        {
          validators: [Validation.match('password', 'confirmPassword')],
        });
        
    
    


    // const today = new Date().toISOString().split('T')[0];
    // this.form.get('dob')?.setValidators([Validators.required, this.dateValidator(today)]);
    // this.form.get('dob')?.updateValueAndValidity();
  }

  dateValidator(today: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const dob = control.value;
      return dob && dob >= today ? { invalidDate: true } : null;
    };
  }

  // dateValidator(today: string = new Date().toISOString().split('T')[0]): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const dob = control.value;
  //     return dob && dob >= today ? { invalidDate: true } : null;
  //   };
  // }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];  // Returns 'YYYY-MM-DD' format
  } 
  
  onDateChange(event: any) {
    const date = event.target.value; // This will be in format "yyyy-mm-dd"
    this.dob = date; // Directly assign the formatted date
    //alert(this.dob); // For debugging or further processing
  }

  signup() {
    // this.usrSngUp.username = this.username;
    // this.usrSngUp.password = this.password;
    // this.usrSngUp.email = this.email;
    // this.usrSngUp.dob = this.dob;
    // this.usrSngUp.gender = this.gender;

    // this.dataTrnfrSrvc.setData(this.usrSngUp);
    this.router.navigate(['/select-avatar']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    // alert("suceess values");
    // console.log()
    // this.router.navigate(['/select-avatar']);
    // console.log("hello");

    if (this.form.invalid) {
      return;
    }
    console.log("hello");
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  next() {

    
    this.submitted = true;
    // alert("suceess values");
    // console.log()
    // this.router.navigate(['/select-avatar']);
    // console.log("hello");

    if (this.form.invalid) {
      return;
    }
    if (this.form.valid) {

      const usrSngUp: UserSignup = {
        username: this.form.value.username?? '',
        password: this.form.value.password?? '',
        email: this.form.value.email?? '',
        dob: this.form.value.dob?? '',
        gender: this.form.value.gender?? '',
        avatarCode: ""
      }
  
      this.dataTrnfrSrvc.setData(usrSngUp);

      this.router.navigate(['/select-avatar']);
    }
  }
}
