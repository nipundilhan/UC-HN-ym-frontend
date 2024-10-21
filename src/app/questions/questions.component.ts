import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { AvatarService } from 'src/app/_services/avatar.service';  // Import the AvatarService

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(    
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private cdr: ChangeDetectorRef,
    private avatarService: AvatarService,) { }

  selectedQuestion: any;
  isQuestionModalOpen = false;
  questions: any[] = [];
  public avatarPath: string = '';
  currentPage: number = 1; // Current page number
  questionsPerPage: number = 4; // Number of questions to display per page

  ngOnInit(): void {
    this.getQuestions(); // Fetch questions from your API
  }

  getQuestions(): Promise<void>  {

    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.QANDA.SHARED_QNA + "/" + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.questions = response.data.QandA;
          console.log(this.questions.length);
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

  getLikeStatus(): Promise<void> {
    return new Promise((resolve, reject) => {
        this.apiCallService.executeGetNoAuth(API_ENDPOINTS.QANDA.SHARED_QNA + "/" + this.userAuthService.getUserId()).subscribe(
            (response: any) => {
                // Find the updated question from the response
                const updatedQuestion = response.data.QandA.find((q: any) => q._id === this.selectedQuestion._id);
                if (updatedQuestion) {
                    // Update the selected question properties with fresh data
                    this.selectedQuestion.liked = updatedQuestion.liked;
                    this.selectedQuestion.likesCount = updatedQuestion.likesCount;
                }

                resolve(); // Resolve the promise after the data is successfully fetched
            },
            (error: any) => {
                console.log(error);
                reject(error); // Reject the promise in case of an error
            }
        );
    });
}

formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = date.toLocaleString('en-US', options).replace(',', ''); // Remove comma for cleaner output
  return formattedDate.replace(/(AM|PM)/, (match) => `${match}`); // Ensure AM/PM is directly after the time
}

getUserAvatar(ownerAvatarCode: string): string {
  // Use the AvatarService to get the avatar path based on the avatar code
  return this.avatarService.getAvatarPathByCode(ownerAvatarCode); // Existing method from your service
}

   // Utility function to strip HTML tags
   stripHtmlTags(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  openQuestion(question: any): void {
    this.selectedQuestion = question;
    this.selectedQuestion.answer = this.stripHtmlTags(this.selectedQuestion.answer); // Strip HTML tags from the answer

    this.isQuestionModalOpen = true;
  }

  closeModal() {
    this.isQuestionModalOpen = false;
    }

  likeQuestion() {
  

    const requestBody = {
      ownerStudentId: this.selectedQuestion.ownerStudentId,
      rateStudentId: this.userAuthService.getUserId(),
      QandAId: this.selectedQuestion._id,  
      // rate: "LIKE"
      rate: this.selectedQuestion.liked === 'NO' ? "LIKE" : "DISLIKE"    
      };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.QANDA.RATE, requestBody).subscribe(
      async (response: any) => {
        
        // Fetch the selectedQuestion liked status immediately
        await this.getLikeStatus(); // Fetch updated like status

        // this.getQuestions(); //Fetch fresh data again
        const savedPage = this.currentPage; // Save the current page before refreshing data

        this.getQuestions().then(() => {
          this.currentPage = savedPage; // Restore the saved page after fetching fresh data
        });

      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while liking the question");
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.questions.length / this.questionsPerPage);
  }

  get paginatedQuestions(): any[] {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    return this.questions.slice(startIndex, startIndex + this.questionsPerPage);
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

  toggleShowMore(question: any, event: Event): void {
    event.preventDefault(); // Prevent page reload on link click
    question.showMore = !question.showMore; // Toggle the showMore flag
  }

}
