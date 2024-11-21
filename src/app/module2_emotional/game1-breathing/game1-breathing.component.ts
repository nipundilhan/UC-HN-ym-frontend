import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-game1-breathing',
  templateUrl: './game1-breathing.component.html',
  styleUrls: ['./game1-breathing.component.css']
})
export class Game1BreathingComponent implements OnInit {
  breathingForm: FormGroup;
  isPopupVisible: boolean = false;
  breathingModalOpen: boolean = false;
  BreathingData: any;

  showTooltip: string = ''; // Variable to hold the tooltip message
  gamePoints: number = 0;
  gameMargins: { margin1: number;} | null = null; 
  completedTasks: number = 0;
  
  showTimeInput: boolean = false; // Show time input condition

  currentPage: number = 1; // Tracks the current page of the popup
  showPracticeOptions: boolean = false; // Controls radio button visibility
  selectedTechnique: string = '';
  submitButtonText: string = 'Next';


  cycleCount: number = 0;  // Holds the number of cycles (e.g., 5)
  currentCycle: number = 0;  // Tracks current cycle
  sessionRunning: boolean = false;
  sessionPaused: boolean = false;
  interval: any;
  gifSource: string = '';  // Holds the GIF source URL
  showCompletionMessage: boolean = false;

  dummyData = {
    sessions: [
      { technique: '4-4-4 technique', cycle: 5, date: '11-11-2024' },
      { technique: 'Lion breathing', cycle: 10, date: '11-11-2024' },
      { technique: 'box breathing', cycle: 15, date: '11-11-2024' },
      { technique: 'box breathing', cycle: 20, date: '11-11-2024' },
    ],
  };

  constructor(private fb: FormBuilder,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
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
    if (this.currentPage === 1) {
      if (this.selectedTechnique === 'belly' || this.selectedTechnique === 'alternate'){
        this.currentPage = 2; // Move to time input page directly
      } else {
        const practiceOption = this.breathingForm.value.practiceOption;
        if (practiceOption) this.currentPage = 2; // Move to next step based on radio selection
      }
    } else if (this.currentPage === 2) {
      this.onSubmit();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


  getLoggedSessions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.BREATHING.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.BreathingData = response.breathingPractises;
          this.gamePoints = response.gamePoints;
   
          resolve(); // Resolve the promise after the data is successfully fetched
        },
        (error: any) => {
          console.log(error);
          reject(error); // Reject the promise in case of an error
        }
      );
    });
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

  // onSubmit(): void {
  //   const formData = this.breathingForm.value;

  //   const requestBody = {
  //     studentId: this.userAuthService.getUserId(),
  //     techniqueCode: formData.technique, 
  //     cycles: formData.cycles,
  //     time: formData.timeSpent,
  //   };

  //   this.apiCallService.executePostNoAuth(API_ENDPOINTS.BREATHING.BASE, requestBody).subscribe(
  //     (response: any) => {
        
  //       this.getLoggedSessions();
  //     },
  //     (httpError: any) => {
  //       console.log(httpError);
  //       alert("An error occurred while recording the question");
  //     }
  //   );
  
  //   this.isPopupVisible = false;
  //   this.resetForm();
  // }

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
        this.getLoggedSessions();
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
    this.currentPage = 1;
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

    // Method to run the session (with cycling logic)
    runSession() {
      this.interval = setInterval(() => {
        if (!this.sessionPaused) {
          this.currentCycle++;
          if (this.currentCycle >= this.cycleCount) {
            this.endSession();  // End session after completing all cycles
          }
        }
      }, 5000);  // Adjust the interval for each cycle (e.g., 5 seconds per cycle)
    }
    

    updateGifSource(): void {
      if (this.selectedTechnique === 'Box-breathing') {
        this.gifSource = '/assets/gifs/box-breathing.gif'; 
      } else if (this.selectedTechnique === '4-7-8') {
        this.gifSource = '/assets/gifs/424-breathing.gif';  
      } 
    }

  // Methods for session management
  stopSession() {
    clearInterval(this.interval);
    this.sessionRunning = false;
    this.sessionPaused = false;
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
}