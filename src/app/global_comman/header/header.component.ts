import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { AvatarService } from 'src/app/_services/avatar.service';  // Import the AvatarService
import { PointsService } from 'src/app/_services/points.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';


interface Avatar {
  code: string;
  path: string;
}

export interface Message {
  message: string; // the raw message content
  sanitizedMessage?: any; // sanitized HTML message (to be set later)
  status: string; // example: 'IMPORTANT' or other status
  date: string; // example: message date
  title: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit {
importantMsgCount: number = 0;
messages: any[] = [];
recentMessages: any[] = [];
selectedMessage: any = null;
// avatarPath: string = '';

  studentData: any = {}; // Initialize as an empty object

  public avatarPath: string = ''; // Variable to store the avatar image path
  userName: string = '';

 
  private inactivityTimeout: any; // Timer for inactivity
  private INACTIVITY_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
  private autoLogoutEnabled: boolean = false; // Set to 'false' to disable auto logout

  constructor(
    private userAuthService: UserAuthService ,
    private router: Router,
    public apiCallService: ApiCallService,
    private avatarService: AvatarService,
    private pointsService: PointsService,
    public sanitizer: DomSanitizer,
    private datePipe: DatePipe 
  ) { }


  loadMessages() {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.NOTIFICATIONS.MESSAGES).subscribe(
      (response: Message[]) => {
        // Filter out messages with status "HIDE"
        const filteredMessages = response.filter(msg => msg.status !== 'HIDDEN');
  
        // Process the filtered messages
        this.messages = filteredMessages.map(msg => ({
          ...msg,
          sanitizedMessage: this.sanitizer.bypassSecurityTrustHtml(msg.message),
          relativeDate: this.getRelativeTime(msg.date),  // Format date to relative time
        }));
        
        // Count important messages
        this.importantMsgCount = this.messages.filter(msg => msg.status === "IMPORTANT").length;
  
        const importantMessages = this.messages.filter(msg => msg.status === 'IMPORTANT');
        const normalMessages = this.messages.filter(msg => msg.status !== 'IMPORTANT');
    
        // Combine important and normal messages, limit to the last 3
        this.recentMessages = [...importantMessages, ...normalMessages].slice(0, 3);
  
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  

  getRelativeTime(date: string): string {
    const datePipe = new DatePipe('en-US');
    const now = new Date();
    const messageDate = new Date(date);
    
    const secondsDiff = Math.floor((now.getTime() - messageDate.getTime()) / 1000);
    const minutesDiff = Math.floor(secondsDiff / 60);
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
  
    if (daysDiff > 0) {
      return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`; 
    } else if (hoursDiff > 0) {
      return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
    } else if (minutesDiff > 0) {
      return `${minutesDiff} minute${minutesDiff > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now'; // If the message was just sent
    }

  }

  stripHtmlTags(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }


  ngOnInit(): void {
    this.loadMessages(); // Initialize with dummy data
    this.avatarService.avatarPath$.subscribe((path) => {
      this.avatarPath = path;
    });

    // this.avatarPath = this.avatarService.getAvatarPath(); // Fetch the avatar path

    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(

      (response: any) => {
        this.studentData = response;
        this.avatarPath = this.avatarService.getAvatarPathByCode(this.studentData.avatarCode);
      },
      (httpError: any) => {
        console.log(httpError);
      }
    );
    // Subscribe to total marks updates
    this.pointsService.totalMarks$.subscribe((newTotalMarks) => {
      this.studentData.totalMarks = newTotalMarks; // Update points in the header
    });
    if (this.autoLogoutEnabled) {
    this.resetInactivityTimer();
    this.addActivityListeners();
    this.addUnloadListener();
    }
  }


  ngOnDestroy(): void {
    if (this.autoLogoutEnabled) {
    this.removeActivityListeners();
    this.removeUnloadListener();
    clearTimeout(this.inactivityTimeout);
    }
  }

// Opens the popup with the selected message details
openMessagePopup(msg: any, event: MouseEvent) {
  event.preventDefault(); // Prevent default link behavior
  this.selectedMessage = msg;
  
}

// Closes the message popup
closeMessagePopup() {
  this.selectedMessage = null;
}

// Redirects to the messages page
redirectToMessagesPage() {
  this.router.navigate(['/messages']);
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


  // Reset inactivity timer
  private resetInactivityTimer() {
    if (!this.autoLogoutEnabled) return; 

    clearTimeout(this.inactivityTimeout); // Clear any existing timer
    this.inactivityTimeout = setTimeout(() => {
      this.logout(); // Auto-logout after inactivity
    }, this.INACTIVITY_DURATION);
  }

  // Add listeners for user activity
  private addActivityListeners() {
    if (!this.autoLogoutEnabled) return;

    window.addEventListener('mousemove', () => this.resetInactivityTimer());
    window.addEventListener('keydown', () => this.resetInactivityTimer());
    window.addEventListener('scroll', () => this.resetInactivityTimer());
    window.addEventListener('click', () => this.resetInactivityTimer());
  }

  private removeActivityListeners() {
    if (!this.autoLogoutEnabled) return;
    window.removeEventListener('mousemove', () => this.resetInactivityTimer());
    window.removeEventListener('keydown', () => this.resetInactivityTimer());
    window.removeEventListener('scroll', () => this.resetInactivityTimer());
    window.removeEventListener('click', () => this.resetInactivityTimer());
  }

  // Handle browser/tab close
  private addUnloadListener() {
    if (!this.autoLogoutEnabled) return;
    window.addEventListener('beforeunload', this.handleUnload.bind(this));
  }

  private removeUnloadListener() {
    if (!this.autoLogoutEnabled) return;
    window.removeEventListener('beforeunload', this.handleUnload.bind(this));
  }

  private handleUnload(event: BeforeUnloadEvent) {
    if (!this.autoLogoutEnabled) return;
    this.logout(); // Log the user out on tab or browser close
    // Optionally show a warning (commented out)
    // event.returnValue = ''; // Standard behavior for showing a close warning
  }


}
