import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { Router } from '@angular/router';
import { PointsService } from 'src/app/_services/points.service';

@Component({
  selector: 'app-game1-breathing',
  templateUrl: './game1-breathing.component.html',
  styleUrls: ['./game1-breathing.component.css']
})
export class Game1BreathingComponent implements OnInit {
  breathingForm: FormGroup;
  isPopupVisible: boolean = false;
  breathingModalOpen: boolean = false;
  BreathingData: any[] = [];
  AllData: any;

  showTooltip: string = ''; // Variable to hold the tooltip message
  gamePoints: number = 0;
  gameMargins: { margin1: number;} | null = null; 
  completedTasks: number = 0;
  
  showTimeInput: boolean = false; // Show time input condition

  // currentPage: number = 1; // Tracks the current page of the popup

  popupCurrentPage: number = 1; // Tracks the current page of the popup
  paginationCurrentPage: number = 1; // Tracks the current page for pagination


  showPracticeOptions: boolean = false; // Controls radio button visibility
  selectedTechnique: string = '';
  submitButtonText: string = 'Next';


  isAchievementPopupOpen = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible
  badgeClass: string = 'badge-grey'; // Initially grey
  showBadge01: Boolean = false;

  BreathingPerPage: number = 6; // Number of questions to display per page

  cycleCount: number = 0;  // Holds the number of cycles (e.g., 5)
  currentCycle: number = 0;  // Tracks current cycle
  sessionRunning: boolean = false;
  sessionPaused: boolean = false;
  interval: any;
  gifSource: string = '';  // Holds the GIF source URL
  showCompletionMessage: boolean = false;

  breathingPractises: any[] = [];

  constructor(private fb: FormBuilder,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private pointsService: PointsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.breathingForm = this.fb.group({
      technique: ['', Validators.required],
      practiceOption: ['system', Validators.required], 
       // Only shown for Box or 4-7-8
      cycles: [2], // For practicing within the system
      timeSpent: [''], // For logging details
    });
  }

  ngOnInit(): void {
    this.getLoggedSessions();
    this.breathingForm.get('technique')?.valueChanges.subscribe((technique) => {
      this.selectedTechnique = technique;
      this.handleTechniqueChange(technique);
    });
    this.fetchBadgeMargin();
  }

  handleTechniqueChange(technique: string): void {
    if (technique === 'Box-breathing' || technique === '4-7-8') {
      this.showPracticeOptions = true; // Show practice/log radio buttons
    } else if (technique === 'Belly Breathing') {
      this.showPracticeOptions = false; // Skip directly to logging details
      this.breathingForm.patchValue({ practiceOption: 'log' });
    }
    else if (technique === 'Alternate Nostril Breathing') {
      this.showPracticeOptions = false; // Skip directly to logging details
      this.breathingForm.patchValue({ practiceOption: 'log' });
    }
  }

  goToNextPage(): void {
    if (this.popupCurrentPage === 1) {
      if (this.selectedTechnique === 'belly' || this.selectedTechnique === 'alternate'){
        this.popupCurrentPage = 2; // Move to time input page directly
      } else {
        const practiceOption = this.breathingForm.value.practiceOption;
        if (practiceOption) this.popupCurrentPage = 2; // Move to next step based on radio selection
      }
    } else if (this.popupCurrentPage === 2) {
      this.onSubmit();
    }
  }

  goToPreviousPage(): void {
    if (this.popupCurrentPage > 1) {
      this.popupCurrentPage--;
    }
  }


  getLoggedSessions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.BREATHING.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.AllData = response;
          this.BreathingData = this.AllData.breathingPractises;
          // this.gamePoints = response.gamePoints;
          this.gamePoints = this.AllData.gamePoints;
   
          resolve(); // Resolve the promise after the data is successfully fetched
        },
        (error: any) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        }
      );
    });
  }

  fetchUpdatedStudentPoints(): void {

    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.AllData = response; // Updated student data, including points
        this.pointsService.updateTotalMarks(this.AllData.totalMarks); // Update total points in the header or wherever it's displayed
        this.cdr.detectChanges(); // Trigger change detection to ensure UI reflects the updated points
  
        this.getLoggedSessions(); // Ensure this fetches latest data
  
      },
      (httpError: any) => {
        console.log(httpError);
      }
  
    );
    }

  openBreathingPopup() {
    console.log("hi");
    this.isPopupVisible = true;
  }

  closeBreathingPopup() {
    this.isPopupVisible = false;
    this.resetForm();

  }


  onTechniqueChange(): void {
    this.selectedTechnique = this.breathingForm.value.technique;

    // Show time input only for alternate and belly breathing or if logging details
    if (this.selectedTechnique === 'alternate' || this.selectedTechnique === 'belly' ) {
      this.showTimeInput = true;
    } else {
      this.showTimeInput = this.breathingForm.value.practiceOption === 'log';
    }
  }

  onSubmit(): void {
    const formData = this.breathingForm.value;
  
    // Prepare the request body based on practiceOption
    const requestBody: any = {
      studentId: this.userAuthService.getUserId(),
      techniqueCode: formData.technique,
    };
  
    if (formData.practiceOption === 'system') {
      requestBody.cycles = formData.cycles; // Save cycles only
    } else if (formData.practiceOption === 'log') {
      requestBody.time = formData.timeSpent; // Save timeSpent only
    }
  
    // Make the API call to save the data
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.BREATHING.BASE, requestBody).subscribe(
      (response: any) => {
        // Update sessions after successful save

        setTimeout(() => {
          this.fetchUpdatedStudentPoints(); 
          this.fetchBadgeMargin();  //update the points in header and fetches latest tutorial data
        }, 100); // Delay to ensure data consistency

        this.checkAchievement(); // Check for achievement after data fetch
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while recording the session");
      }
    );
  
    // Close the popup and reset the form
    this.isPopupVisible = false;
    this.resetForm();
  }
  

  resetForm(): void {
    this.popupCurrentPage = 1;
    this.showPracticeOptions = false;
    this.breathingForm.reset({
      technique: '',
      practiceOption: 'system',
      cycles: 2,
      timeSpent: '',
    });
  }


  startBreathingSession(): void {
    this.isPopupVisible = false;
    this.selectedTechnique = this.breathingForm.value.technique;
    this.cycleCount = this.breathingForm.value.cycles;

    if (this.selectedTechnique && this.cycleCount > 0) {
      this.sessionRunning = true;
  
      this.currentCycle = 0; // Reset cycle count
      this.updateGifSource(); // Set the relevant GIF based on the technique
  
      this.runSession(); // Start the session
    }
  }

  // Method to run the session (with dynamic cycling logic based on technique)
runSession() {
  // Set the interval duration based on the selected technique
  const intervalDuration = this.selectedTechnique === '4-7-8' ? 18000 : 17000;

  this.interval = setInterval(() => {
    if (!this.sessionPaused) {
      this.currentCycle++;
      if (this.currentCycle >= this.cycleCount) {
        this.endSession();  // End session after completing all cycles
      }
    }
  }, intervalDuration);  // Adjust the interval dynamically based on the technique
}

    // // Method to run the session (with cycling logic)
    // runSession() {
    //   this.interval = setInterval(() => {
    //     if (!this.sessionPaused) {
    //       this.currentCycle++;
    //       if (this.currentCycle >= this.cycleCount) {
    //         this.endSession();  // End session after completing all cycles
    //       }
    //     }
    //   }, 17000);  // Adjust the interval for each cycle (e.g., 16-17 seconds per cycle)
    // }
    

    updateGifSource(): void {
      if (this.selectedTechnique === 'Box-breathing') {
        this.gifSource = '/assets/gifs/box-breathing.gif'; 
      } else if (this.selectedTechnique === '4-7-8') {
        this.gifSource = '/assets/gifs/4-7-8-breathing.gif';  
      } 
    }

  // Methods for session management
  stopSession() {
    clearInterval(this.interval);
    this.sessionRunning = false;
    this.sessionPaused = false;
    this.resetForm();
  }

  togglePauseResume() {
    if (this.sessionRunning) {
      if (this.sessionPaused) {
        this.resumeSession();
      } else {
        this.pauseSession();
      }
    }
  }

  pauseSession() {
    this.sessionPaused = true;
    clearInterval(this.interval);
  }

  resumeSession() {
    this.sessionPaused = false;
    // Implement session resumption logic if needed
  }


  endSession() {
    console.log("finished");
    clearInterval(this.interval);  // Clear the interval when session ends
    this.sessionRunning = false;
  
    this.onSubmit();

  
    this.showCompletionMessage = true;
  
    //You can set a timeout here to hide the message after a short time, if desired
    setTimeout(() => {
      this.showCompletionMessage = false;
    }, 3000);  // Message will disappear after 3 seconds
  }
  

  hasEarnedBadge(margin: number | null | undefined): boolean {
    if (margin === null || margin === undefined) {
        return false; // or handle the case as needed
    }
    return this.gamePoints >= margin;
  }

  fetchBadgeMargin(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.gameMargins = {
          margin1: response.game4Margin1
        };
        this.completedTasks = response.game4Marks;
      },
      (httpError: any) => {
        console.log(httpError);
      }
  
    );
  }

  checkAchievement(): void {

    const gamePoints = this.AllData.gamePoints;
    console.log(gamePoints);
  
    // Ensure badges are reset at the beginning
    this.showBadge01 = false;

  
    // Show badge based on game points (giving badge when logging the secon session)
    if (gamePoints === 4) {
      this.isAchievementPopupOpen = true; // Show achievement popup
  
      // Show the padlock initially
      this.isPadlockVisible = true;
  
      // Fade out the padlock after 2.5 seconds
      setTimeout(() => {
        this.isPadlockVisible = false; // Hide padlock
      }, 2500);
  
      this.showBadge01 = true; // Show badge 01
      this.badgeClass = 'unlocking-animation'; // Trigger badge animation
    } 

  }
  

  shareAchievement(): void {
    this.isAchievementPopupOpen = false;
    this.router.navigate(['/achievements']);
  }


  get totalPages(): number {
    // console.log(this.QnA.length);
    // return Math.ceil(this.BreathingData.length / this.BreathingPerPage);
    return Math.max(1, Math.ceil(this.BreathingData.length / this.BreathingPerPage));

  }

  get paginatedQuestions(): any[] {
    const startIndex = (this.paginationCurrentPage - 1) * this.BreathingPerPage;
    return this.BreathingData.slice(startIndex, startIndex + this.BreathingPerPage);
  }

  nextPage(): void { 
    if (this.paginationCurrentPage < this.totalPages) {
      this.paginationCurrentPage++;
    }
  }

  prevPage(): void {
    if (this.paginationCurrentPage > 1) {
      this.paginationCurrentPage--;
    }
}
  
}