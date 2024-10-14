import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { AvatarService } from 'src/app/_services/avatar.service';  // Import the AvatarService
import { PointsService } from 'src/app/_services/points.service';

interface Avatar {
  code: string;
  path: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  studentData: any = {}; // Initialize as an empty object

  public avatarPath: string = ''; // Variable to store the avatar image path


  constructor(
    private userAuthService: UserAuthService ,
    private router: Router,
    public apiCallService: ApiCallService,
    private avatarService: AvatarService,
    private pointsService: PointsService 
  ) { }

  ngOnInit(): void {
    this.avatarPath = this.avatarService.getAvatarPath(); // Fetch the avatar path

    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(

      (response: any) => {
        this.studentData = response;

      },
      (httpError: any) => {
        console.log(httpError);
      }
    );
    // Subscribe to total marks updates
    this.pointsService.totalMarks$.subscribe((newTotalMarks) => {
      this.studentData.totalMarks = newTotalMarks; // Update points in the header
    });
  }

  public logout() {
    // Clear user data and navigate
    this.userAuthService.clear();
    this.router.navigate(['/introduction']);
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public getUserName() {
    return this.userAuthService.getUserName();
  }

  public getPoints() {
    return this.userAuthService.getUser();
  }



}
