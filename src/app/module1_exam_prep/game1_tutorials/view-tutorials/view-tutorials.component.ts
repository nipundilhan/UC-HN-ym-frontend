import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-view-tutorials',
  templateUrl: './view-tutorials.component.html',
  styleUrls: ['./view-tutorials.component.css']
})
export class ViewTutorialsComponent implements OnInit {

  studentData: any;
  loading = true; // Initialize loading to true

  constructor(public apiCallService: ApiCallService , private userAuthService: UserAuthService , private router: Router ) { }

  ngOnInit(): void {

    this.getStudentData(); 
  }

  goToAddTute(): void {

    const dataToPass = { studentTaskId: this.studentData ? this.studentData._id : null, param2: 'value2' }; 
    this.router.navigate(['/tutorial-submission'], { state: dataToPass });
  }

  getStudentData(): void {


    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.TUTORIALS.GET_BY_STUDENT_ID+this.userAuthService.getUserId()).subscribe(
      (response: any) => {


        this.studentData = response;
        this.loading = false; // Stop loading when data is fetched
  


      },
      (httpError: any) => {
        console.log(httpError);
        this.loading = false;
      }   
    );



  }

}
