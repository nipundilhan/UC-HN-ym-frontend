import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { AvatarService } from 'src/app/_services/avatar.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { BadgeService } from 'src/app/_services/badge.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  AllData: any;
  notifications: any[] = [];
  currentPage: number = 1; // Current page number
  NotificationsPerPage: number = 4; // Number of questions to display per page

  constructor(
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private avatarService: AvatarService,
    private router: Router,
    private badgeService: BadgeService
  ) { }

  ngOnInit(): void {
    this.fetchNotifications(); // Fetch notifications from your API
  }

  fetchNotifications(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.NOTIFICATIONS.BASE).subscribe(        
        (response: any) => {
          this.AllData = response;
          this.notifications = response;
          // this.notifications = response.data.mindMaps;
          // this.currentPage = 1; // Reset to first page after loading
          resolve(); // Resolve the promise after the data is successfully fetched
        },
        (error: any) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        }
      );
    });
  }

  getBadgeImage(badgeCode: string): string {
    return this.badgeService.getPathByRef(badgeCode);
  }

  getBadgeName(badgeCode: string): any {
    return this.badgeService.getByRef(badgeCode).badgeName;
    // return obj.badgeName + " in " +  obj.gameName;
  }

  getGameName(badgeCode: string): any {
    return this.badgeService.getByRef(badgeCode).gameName;
  }


  getUserAvatar(ownerAvatarCode: string): string {
    // Use the AvatarService to get the avatar path based on the avatar code
    return this.avatarService.getAvatarPathByCode(ownerAvatarCode); // Existing method from your service
  }

  get totalPages(): number {
    // console.log(this.QnA.length);
    return Math.ceil(this.notifications.length / this.NotificationsPerPage);
  }

  get paginatedNotifications(): any[] {
    const startIndex = (this.currentPage - 1) * this.NotificationsPerPage;
    return this.notifications.slice(startIndex, startIndex + this.NotificationsPerPage);
  }

  nextPage(): void { 
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
}
}
