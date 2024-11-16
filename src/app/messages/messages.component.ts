import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

export interface Message {
  message: string; // the raw message content
  sanitizedMessage?: any; // sanitized HTML message (to be set later)
  status: string; // example: 'IMPORTANT' or other status
  date: string; // example: message date
  title: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  allMessages: Message[] = [];
  selectedMessage: any = null; // Selected message for the popup
  isPopupOpen: boolean = false; // Popup visibility state

  constructor(
    private userAuthService: UserAuthService ,
    public apiCallService: ApiCallService,
    public sanitizer: DomSanitizer 
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  // loadMessages(): void {
  //   this.apiCallService.executeGetNoAuth(API_ENDPOINTS.NOTIFICATIONS.MESSAGES).subscribe(
  //     (response: Message[]) => { // Type the response as an array of `Message`
  //       this.allMessages = response.map(msg => ({
  //         ...msg, 
  //         sanitizedMessage: this.sanitizer.bypassSecurityTrustHtml(msg.message)
  //       }));
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   );
  // }

  loadMessages(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.NOTIFICATIONS.MESSAGES).subscribe(
      (response: Message[]) => { // Type the response as an array of `Message`
        // Filter out messages with status "HIDE"
        this.allMessages = response
          .filter(msg => msg.status !== 'HIDDEN')  // Exclude "HIDE" status messages
          .map(msg => ({
            ...msg, 
            sanitizedMessage: this.sanitizer.bypassSecurityTrustHtml(msg.message)
          }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  // Open the popup for a selected message
  openMessagePopup(msg: any): void {
    this.selectedMessage = msg;
    this.isPopupOpen = true;
  }

  // Close the popup
  closePopup(event: Event): void {
    event.preventDefault();
    this.isPopupOpen = false;
    this.selectedMessage = null;
  }

  // Prevent event propagation for inner popup content
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}
