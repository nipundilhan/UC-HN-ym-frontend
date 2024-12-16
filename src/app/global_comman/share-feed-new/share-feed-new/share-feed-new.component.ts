import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { ApiCallService } from 'src/app/_services/api-call.service';

@Component({
  selector: 'app-share-feed-new',
  templateUrl: './share-feed-new.component.html',
  styleUrls: ['./share-feed-new.component.css']
})
export class ShareFeedNewComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    public apiCallService: ApiCallService,
  ) { }

  ngOnInit(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.USERS.TIME_TRACKING + '/' + this.userAuthService.getUserId())
    .subscribe(
      response => {

      },
      error => {
        // console.error("Error deleting the user:", error);
      }
    );

  }

  selectedTab: string = 'notifications'; // Default tab

  // Method to switch between tabs
  switchTab(tab: string): void {
    this.selectedTab = tab;
  }


}
