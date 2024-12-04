import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { AvatarService } from 'src/app/_services/avatar.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-mindmaps',
  templateUrl: './mindmaps.component.html',
  styleUrls: ['./mindmaps.component.css']
})
export class MindmapsComponent implements OnInit {
  selectedMindMap: any;
  isMindmapModalOpen = false;
  mindmaps: any[] = [];
  AllData: any;
  currentPage: number = 1; // Current page number
  mindmapsPerPage: number = 6; // Number of questions to display per page

  constructor(private avatarService: AvatarService,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private cdr: ChangeDetectorRef,
  ) { }

  // mindmaps: any[] = [];

  ngOnInit(): void {
    this.fetchMindmaps(); // Fetch mindmaps from your API
  }

  fetchMindmaps(): Promise<void>  {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MINDMAPS.SHARED_MINDMAPS + "/" + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.AllData = response;
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

  openMindMap(mindmap: any): void {
    this.selectedMindMap = mindmap;
    this.isMindmapModalOpen = true;
  }

  closeModal() {
    this.isMindmapModalOpen = false;
    }

  likeMindMap() {
      const requestBody = {
        // ownerStudentId: this.selectedQuestion.ownerStudentId,
        ownerUserName: this.selectedMindMap.ownerStudentName,
        rateStudentId: this.userAuthService.getUserId(),
        mindMapId: this.selectedMindMap._id,  
        // rate: "LIKE"
        rate: this.selectedMindMap.liked === 'NO' ? "LIKE" : "DISLIKE"    
        };
  
      this.apiCallService.executePostNoAuth(API_ENDPOINTS.MINDMAPS.RATE, requestBody).subscribe(
        async (response: any) => {
          
          // Fetch the selectedQuestion liked status immediately
          await this.getLikeStatus(); // Fetch updated like status
  
          // this.getQuestions(); //Fetch fresh data again
          const savedPage = this.currentPage; // Save the current page before refreshing data
  
          this.fetchMindmaps().then(() => {
            this.currentPage = savedPage; // Restore the saved page after fetching fresh data
          });
  
        },
        (httpError: any) => {
          console.log(httpError);
          alert("An error occurred while liking the mindmap. Try again later");
        }
      );
    }

    getLikeStatus(): Promise<void> {
      return new Promise((resolve, reject) => {
          this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MINDMAPS.SHARED_MINDMAPS + "/" + this.userAuthService.getUserId()).subscribe(
              (response: any) => {
                  // Find the updated question from the response
                  const updatedMindmap = response.data.mindMaps.find((q: any) => q._id === this.selectedMindMap._id);
                  if (updatedMindmap) {
                      // Update the selected question properties with fresh data
                      this.selectedMindMap.liked = updatedMindmap.liked;
                      this.selectedMindMap.likesCount = updatedMindmap.likesCount;
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
  


  // getUserAvatar(userId: string): string {
  //   return 'assets/avatar-img/ava01.png'; 
  // }


  getUserAvatar(ownerAvatarCode: string): string {
    // Use the AvatarService to get the avatar path based on the avatar code
    return this.avatarService.getAvatarPathByCode(ownerAvatarCode); // Existing method from your service
  }

  downloadMindMap(): void {
    if (this.selectedMindMap && this.selectedMindMap.imageUrl) {
      const link = document.createElement('a');
      link.href = this.selectedMindMap.imageUrl; // URL of the image
      link.download = `mindmap-${this.selectedMindMap.id}.png`; // Set a filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleString('en-US', options).replace(',', ''); // Remove comma for cleaner output
    return formattedDate.replace(/(AM|PM)/, (match) => `${match}`); // Ensure AM/PM is directly after the time
  }

  get totalPages(): number {
    // return Math.ceil(this.questions.length / this.questionsPerPage);
    return Math.max(1, Math.ceil(this.mindmaps.length / this.mindmapsPerPage));

  }

  get paginatedMindmaps(): any[] {
    const startIndex = (this.currentPage - 1) * this.mindmapsPerPage;
    return this.mindmaps.slice(startIndex, startIndex + this.mindmapsPerPage);
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
