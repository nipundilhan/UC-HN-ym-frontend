import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { AvatarService } from 'src/app/_services/avatar.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {
  activeTab: string = 'mindmaps'; // Default active tab
  AllDataMindmaps: any;
  AllDataQuestions: any;
  mindmaps: any[] = [];
  questions: any [] = [];

  // Selected Item
  selectedMindmap: any;
  selectedQuestion: any;

  // Popups
  showMindmapPopup: boolean = false;
  showQuestionPopup: boolean = false;
  
  sanitizedAnswer!: SafeHtml;
 
  currentPageQuestions: number = 1; 
  questionsPerPage: number = 6; 
  currentPageMindmaps: number = 1; 
  mindmapsPerPage: number = 6; 

  constructor(private http: HttpClient,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private avatarService: AvatarService,
    private sanitizer: DomSanitizer) { }



  ngOnInit(): void {
    this.fetchMindmaps();
    this.fetchQuestions();
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Fetch Mindmaps
  fetchMindmaps(): Promise<void>  {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MINDMAPS.SHARED_FOR_ADMIN).subscribe(
        (response: any) => {
          this.AllDataMindmaps = response;
          this.mindmaps = response.data.mindMaps;
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


  // Fetch Questions
  fetchQuestions(): Promise<void>  {

    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.QANDA.SHARED_FOR_ADMIN).subscribe(
        (response: any) => {
          this.AllDataQuestions = response;
          this.questions = response.data.QandA;

          resolve(); // Resolve the promise after the data is successfully fetched
        },
        (error: any) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        }
      );
    });
   
  }

  // Open Popup for Mindmap
  openMindmapPopup(mindmap: any): void {
    this.selectedMindmap = { ...mindmap };
    this.showMindmapPopup = true;
  }

  // Open Popup for Question
  openQuestionPopup(question: any): void {
    // this.selectedQuestion = { ...question };
    this.selectedQuestion = question;

    this.sanitizedAnswer = this.sanitizer.bypassSecurityTrustHtml(this.selectedQuestion.answer);
    this.showQuestionPopup = true;
  }

  // Close Popups
  closeMindmapPopup(): void {
    this.showMindmapPopup = false;
    this.selectedMindmap = null;
  }

  closeQuestionPopup(): void {
    this.showQuestionPopup = false;
    this.selectedQuestion = null;
  }

  // Save Changes (Update Status)
  saveMindmapChanges(): void {
    const requestBody = {
      ownerStudentId: this.selectedMindmap.ownerStudentId,
      mindMapId: this.selectedMindmap._id,
      sharedStatus: this.selectedMindmap.sharedStatus,
    };

    this.apiCallService.executePutNoAuth(API_ENDPOINTS.MINDMAPS.SHARE, requestBody).subscribe(
      (response: any) => {
     
         // this.getQuestions(); //Fetch fresh data again
         const savedPage = this.currentPageMindmaps; // Save the current page before refreshing data

         this.fetchMindmaps().then(() => {
           this.currentPageMindmaps = savedPage; // Restore the saved page after fetching fresh data
         });

         this.closeMindmapPopup();
         // Handle success response
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while saving the changes");
      }
    );
  }

  saveQuestionChanges(): void {
    const requestBody = {
      ownerStudentId: this.selectedQuestion.ownerStudentId,
      QandAId: this.selectedQuestion._id,
      sharedStatus: this.selectedQuestion.sharedStatus,
    };

    this.apiCallService.executePutNoAuth(API_ENDPOINTS.QANDA.SHARE, requestBody).subscribe(
      (response: any) => {
     
         // this.getQuestions(); //Fetch fresh data again
         const savedPage = this.currentPageQuestions; // Save the current page before refreshing data

         this.fetchQuestions().then(() => {
           this.currentPageQuestions = savedPage; // Restore the saved page after fetching fresh data
         });

        this.closeQuestionPopup();
        // Handle success response
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while saving the changes");
      }
    );
    
  }

  getUserAvatar(ownerAvatarCode: string): string {
    // Use the AvatarService to get the avatar path based on the avatar code
    return this.avatarService.getAvatarPathByCode(ownerAvatarCode); // Existing method from your service
  }




get totalPagesQuestions(): number {
  // return Math.ceil(this.questions.length / this.questionsPerPage);
  return Math.max(1, Math.ceil(this.questions.length / this.questionsPerPage));

}

get paginatedQuestions(): any[] {
  const startIndex = (this.currentPageQuestions - 1) * this.questionsPerPage;
  return this.questions.slice(startIndex, startIndex + this.questionsPerPage);
}

nextPageQuestions(): void {
  if (this.currentPageQuestions < this.totalPagesQuestions) {
    this.currentPageQuestions++;
  }
}

prevPageQuestions(): void {
  if (this.currentPageQuestions > 1) {
    this.currentPageQuestions--;
  }
}


get totalPagesMindmaps(): number {
  // return Math.ceil(this.questions.length / this.questionsPerPage);
  return Math.max(1, Math.ceil(this.mindmaps.length / this.mindmapsPerPage));

}

get paginatedMindmaps(): any[] {
  const startIndex = (this.currentPageMindmaps - 1) * this.mindmapsPerPage;
  return this.mindmaps.slice(startIndex, startIndex + this.mindmapsPerPage);
}

nextPageMindmaps(): void {
  if (this.currentPageMindmaps < this.totalPagesMindmaps) {
    this.currentPageMindmaps++;
  }
}

prevPageMindmaps(): void {
  if (this.currentPageMindmaps > 1) {
    this.currentPageMindmaps--;
  }
}

}