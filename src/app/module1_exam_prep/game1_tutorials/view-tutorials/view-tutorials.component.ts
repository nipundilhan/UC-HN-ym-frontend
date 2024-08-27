import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
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
  isModalOpen: boolean = false;
  isTaskModalOpen: boolean = false;
  selectedTask: any;


  constructor(public apiCallService: ApiCallService ,private dataTrnfrSrvc: DataTransferService,  private userAuthService: UserAuthService , private router: Router ) { }

  ngOnInit(): void {

    this.getStudentData(); 
  }

  openTaskDetails(task: any): void {
    this.selectedTask = task;
    this.isTaskModalOpen = true;
  }

  closeTaskModal(): void {
    this.isTaskModalOpen = false;
  }

  openModal(): void {
    this.isModalOpen = true;
    console.log('Open modal called');
  }

  editTask(task: any): void {
    // Implement your edit logic here
    console.log('Editing task');

  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  goToAddTute(): void {

    const dataToPass = { studentTaskId: this.studentData ? this.studentData._id : null, param2: 'value2' }; 
    this.router.navigate(['/tutorial-submission'], { state: dataToPass });
  }

  getStudentData(): void {


    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.TUTORIALS.GET_BY_STUDENT_ID+this.userAuthService.getUserId()).subscribe(
      (response: any) => {


        this.studentData = response;
        console.log(this.studentData)
        this.dataTrnfrSrvc.setData(this.studentData);
        this.loading = false; // Stop loading when data is fetched
  


      },
      (httpError: any) => {
        console.log(httpError);
        this.loading = false;
      }   
    );



  }

}
