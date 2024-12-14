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
  // breathingForm: FormGroup;
  isPopupVisible: boolean = false;
  breathingModalOpen: boolean = false;
  BreathingData: any[] = [];
  AllData: any;

  showTooltip: string = ''; // Variable to hold the tooltip message
  gamePoints: number = 0;
  gameMargins: { margin1: number; margin2: number;} | null = null; 
  completedTasks: number = 0;
  
  showTimeInput: boolean = false; // Show time input condition

  // currentPage: number = 1; // Tracks the current page of the popup

  popupCurrentPage: number = 1; // Tracks the current page of the popup
  paginationCurrentPage: number = 1; // Tracks the current page for pagination


  showPracticeOptions: boolean = false; // Controls radio button visibility
  selectedTechnique: string = '';
  submitButtonText: string = 'Next';

  selectedOption: string | null = null;
  popupForm!: FormGroup;


  isAchievementPopupOpen = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible
  badgeClass: string = 'badge-grey'; // Initially grey
  showBadge01: Boolean = false;
  showBadge02: Boolean = false;

  isShareModalOpen: Boolean = false;

  BreathingPerPage: number = 6; // Number of questions to display per page

  cycleCount: number = 0;  // Holds the number of cycles (e.g., 5)
  currentCycle: number = 0;  // Tracks current cycle
  sessionRunning: boolean = false;
  sessionPaused: boolean = false;
  interval: any;
  gifSource: string = '';  // Holds the GIF source URL
  showCompletionMessage: boolean = false;

  breathingPractises: any[] = [];


  relaxationMusicEnabled = false; // Check if the user wants music
isMusicPlaying = false;         // Music state
music: HTMLAudioElement | null = null;

  constructor(private fb: FormBuilder,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private pointsService: PointsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
 this.popupForm = this.fb.group({
  technique: ['', Validators.required],
  cycles: [1, [Validators.required, Validators.min(1)]],
  relaxationMusic: [false],
  timeSpent: [null, [Validators.required, Validators.min(1)]],
});
    
  }

  ngOnInit(): void {
    this.getLoggedSessions();
    this.fetchBadgeMargin();
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  
    // Reset form values for the technique when the option changes
    this.popupForm.reset({ technique: '' });
  
    // Dynamically adjust validators based on the selected option
    const cyclesControl = this.popupForm.get('cycles');
    const timeSpentControl = this.popupForm.get('timeSpent');
    
    if (option === 'practice') {
      cyclesControl?.setValidators([Validators.required, Validators.min(1)]);
      timeSpentControl?.clearValidators();
    } else if (option === 'log') {
      timeSpentControl?.setValidators([Validators.required, Validators.min(1)]);
      cyclesControl?.clearValidators();
    }
  
    // Update validation state
    cyclesControl?.updateValueAndValidity();
    timeSpentControl?.updateValueAndValidity();
  }
  

  goToNextPage() {
    this.popupForm.get('technique')?.markAsTouched();
  
    if (this.popupForm.get('technique')?.valid) {
      this.popupCurrentPage = 2;
    }
  }

goToPreviousPage() {
  this.popupCurrentPage = 1;
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
    this.isPopupVisible = true;
  }

  closeBreathingPopup() {
    this.isPopupVisible = false;
    this.popupCurrentPage = 1;
    this.selectedOption = null;
    this.resetForm();
  }

  onSubmit(): void {
    if (this.popupForm.invalid) {
      this.popupForm.markAllAsTouched();
      return;
    }
  
    const formData = this.popupForm.value;
  
    const requestBody: any = {
      studentId: this.userAuthService.getUserId(),
      techniqueCode: formData.technique,
    };
  
    if (this.selectedOption === 'practice') {
      requestBody.cycles = formData.cycles;
    } else if (this.selectedOption === 'log') {
      requestBody.time = formData.timeSpent;
    }
  
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.BREATHING.BASE, requestBody).subscribe(
      () => {
        setTimeout(() => {
          this.fetchUpdatedStudentPoints();
          this.fetchBadgeMargin();
        }, 100);
        this.checkAchievement();
      },
      (error: any) => {
        console.log(error);
        alert("An error occurred while recording the session");
      }
    );
  
    this.isPopupVisible = false;
    this.resetForm();
  }
  
  

  resetForm(): void {
    this.popupCurrentPage = 1;
    this.showPracticeOptions = false;
    this.selectedOption = null; // Clear the selected option
  
    // Reset the form controls and clear their values
    this.popupForm.reset({
      technique: '',
      cycles: '',
      timeSpent: '',
      relaxationMusic: false
    });
  
    // Clear validators from the form
    this.popupForm.clearValidators();
    
    // Re-initialize validation for controls as needed
    const cyclesControl = this.popupForm.get('cycles');
    const timeSpentControl = this.popupForm.get('timeSpent');
    cyclesControl?.clearValidators();
    timeSpentControl?.clearValidators();
  
    // Reapply validators based on the selected option
    if (this.selectedOption === 'practice') {
      cyclesControl?.setValidators([Validators.required, Validators.min(1)]);
    } else if (this.selectedOption === 'log') {
      timeSpentControl?.setValidators([Validators.required, Validators.min(1)]);
    }
  
    cyclesControl?.updateValueAndValidity();
    timeSpentControl?.updateValueAndValidity();
  }
  


  startBreathingSession(): void {
    this.isPopupVisible = false;
    this.selectedTechnique = this.popupForm.value.technique;
    this.cycleCount = this.popupForm.value.cycles;
    this.relaxationMusicEnabled = this.popupForm.value.relaxationMusic;

    console.log(this.popupForm.value);
    if (this.relaxationMusicEnabled) {
      this.music = new Audio('/assets/relaxation-music.mp3');
      this.music.loop = true; // Ensure the music plays continuously
      this.music.volume = 0.5; // Set default volume
      this.music.play();
      this.isMusicPlaying = true;
    }

    if (this.selectedTechnique && this.cycleCount > 0) {
      this.sessionRunning = true;
  
      this.currentCycle = 0; // Reset cycle count
      this.updateGifSource(); // Set the relevant GIF based on the technique
  
      this.runSession(); // Start the session
    }
  }

  toggleMusic(): void {
    if (this.music) {
      if (this.isMusicPlaying) {
        this.music.pause();
      } else {
        this.music.play();
      }
      this.isMusicPlaying = !this.isMusicPlaying;
    }
  }

  // Method to run the session (with dynamic cycling logic based on technique)
runSession() {
  // Set the interval duration based on the selected technique
  const intervalDuration = this.selectedTechnique === '4-7-8 Breathing' ? 18000 : 17000;

  this.interval = setInterval(() => {
    if (!this.sessionPaused) {
      this.currentCycle++;
      if (this.currentCycle >= this.cycleCount) {
        this.endSession();  // End session after completing all cycles
      }
    }
  }, intervalDuration);  // Adjust the interval dynamically based on the technique
}

    updateGifSource(): void {
      if (this.selectedTechnique === 'Box-Breathing') {
        this.gifSource = '/assets/gifs/box-breathing.gif'; 
      } else if (this.selectedTechnique === '4-7-8 Breathing') {
        this.gifSource = '/assets/gifs/4-7-8-breathing.gif';  
      } 
    }

  // Methods for session management
  stopSession() {
    clearInterval(this.interval);
    this.sessionRunning = false;
    this.sessionPaused = false;

     // Stop music
  if (this.music) {
    this.music.pause();
    this.music.currentTime = 0; // Reset playback
    this.music = null;
    this.isMusicPlaying = false;
  }

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
    
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0; // Reset playback
      this.music = null;
      this.isMusicPlaying = false;
    }    
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
          margin1: response.game4Margin1,
          margin2: response.game4Margin2
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
    this.showBadge02 = false;
  

    // Show badge based on game points (giving badge when logging the secon session)
    if (gamePoints === 1) {
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

    // Show badge based on game points (giving badge when logging the secon session)
    if (gamePoints === 4) {
      this.isAchievementPopupOpen = true; // Show achievement popup
  
      // Show the padlock initially
      this.isPadlockVisible = true;
  
      // Fade out the padlock after 2.5 seconds
      setTimeout(() => {
        this.isPadlockVisible = false; // Hide padlock
      }, 2500);
  
      this.showBadge02 = true; // Show badge 01
      this.badgeClass = 'unlocking-animation'; // Trigger badge animation
    } 

  }
  

  shareAchievement(): void {
    this.isAchievementPopupOpen = false;
    let badge = '';
    let ref = '';

    if (this.showBadge01 == true){
      badge = 'badge1';
      ref = 'Game4Badge1'
    }
    else if (this.showBadge02 == true){
      badge = 'badge2';
      ref = 'Game4Badge2'
    }
 
    const requestBody = 

      {
        studentId : this.userAuthService.getUserId(),
        gameCode : "game4",
        badgeCode : badge,
        reference : ref
      };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.MODULES.SHARE_BADGE, requestBody).subscribe(
      async (response: any) => {
        this.openShareModal();

      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while sharing the badge");
      }
    );

    // this.router.navigate(['/notifications']);
  }

  // Method to open the share badge popup
openShareModal(): void {
  this.isShareModalOpen = true;
}

// Method to close the share badge  popup
closeShareModal(): void {
  this.isShareModalOpen = false;
}

viewSharedBadge(): void {
  // Navigate to the shared questions page (assuming you have a route for this)
  this.router.navigate(['share/notifications']);
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