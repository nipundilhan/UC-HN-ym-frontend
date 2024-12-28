import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { PointsService } from 'src/app/_services/points.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';

@Component({
  selector: 'app-play-journalling',
  templateUrl: './play-journalling.component.html',
  styleUrls: ['./play-journalling.component.css']
})
export class PlayJournallingComponent implements OnInit {
  journalForm: FormGroup;
  isPopupVisible: boolean = false;
  breathingModalOpen: boolean = false;
  JournallingData: any[] = [];
  AllData: any;
  studentData: any;
  submitted = false;
  isJournalDetailPopupVisible: boolean = false;
  journalDetailForm: FormGroup;

  selectedJournal: any = {
    date: '',
    technique: '',
    question1: '',
    answer1: '',
    question2: '',
    answer2: '',
  };

  showDeleteConfirmationPopup: boolean = false; // For delete confirmation

  showTooltip: string = ''; // Variable to hold the tooltip message
  gamePoints: number = 0;
  gameMargins: { margin1: number; margin2: number;} | null = null; 
  completedTasks: number = 0;
  
  paginationCurrentPage: number = 1; // Tracks the current page for pagination

  isAchievementPopupOpen = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible
  badgeClass: string = 'badge-grey'; // Initially grey
  showBadge01: Boolean = false;
  showBadge02: Boolean = false;

  isShareModalOpen: Boolean = false;
  
  JournalsPerPage: number = 6; // Number of questions to display per page

  // techniques = ['Gratitude Journalling', 'Self-compassion Journalling', 'Reflective Journalling', 'Expressive Writing'];
  techniques = ['Gratitude Journalling', 'Self-compassion Journalling', 'Reflective Journalling'];


  prompts: { [key: string]: string[] } = {
    'Gratitude Journalling': [
      'Three positive words to describe today',
      'Name three beautiful things that you saw today.',
    'Name something that made you smile today',
  'Name something that you are looking forward to tomorrow'],

    'Self-compassion Journalling': ['Write a kind note to yourself.', 
      'List three things you love the most about yourself.',
      'What has made you proud and excited recently?',
      'Write about a challenge you faced today and how you handled it',
      'Write about the most important lesson you’ve learned in the last 3 months'],
    
    'Reflective Journalling': ['What makes you feel calm?', 
      'What are my top three strengths?',
      'What do you want your life to look like in five years?',
      'What is one thing you can do today to get closer to my goal?',
      'What do you appreciate most about your personality?'
    ],
    // 'Expressive Writing': ['Describe your current emotions.', 'What’s been on your mind lately?'],
  };
  selectedTechnique = '';
  selectedPrompts: string[] = [];

  // JournallingData: any[] = [];
  isSaveEnabled = false;

  helpPopupVisible = false;

  constructor(private fb: FormBuilder,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private pointsService: PointsService,
  ) {
    this.journalForm = this.fb.group({
      technique: ['', Validators.required],
      prompt1: ['', Validators.required],
      customPrompt1: [''], // For user-defined question 1
      prompt2: ['', Validators.required],
      customPrompt2: [''], // For user-defined question 2
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
    });

    this.journalDetailForm = this.fb.group({
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.getLoggedSessions();
    this.journalForm.get('technique')?.valueChanges.subscribe((technique) => {
      this.selectedTechnique = technique;
    });
    this.fetchBadgeMargin();

    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.USERS.TIME_TRACKING + '/' + this.userAuthService.getUserId())
    .subscribe(
      response => {

      },
      error => {
        // console.error("Error deleting the user:", error);
      }
    );

  }

  onTechniqueChange(): void {
    this.selectedTechnique = this.journalForm.get('technique')?.value;
    this.selectedPrompts = [];
    this.journalForm.get('prompt1')?.reset('');
    this.journalForm.get('prompt2')?.reset('');
  }

  onPromptChange(dropdownNumber: number): void {
    const prompt1Value = this.journalForm.get('prompt1')?.value;
    const prompt2Value = this.journalForm.get('prompt2')?.value;

    // Update the selected prompts to disable in the other dropdown
    this.selectedPrompts = [prompt1Value, prompt2Value].filter(Boolean);
  }

  availablePrompts(dropdownNumber: number): string[] {
    const allPrompts = this.prompts[this.selectedTechnique] || [];
    const selectedPrompt = this.journalForm.get(`prompt${dropdownNumber}`)?.value;
    return allPrompts.filter((prompt) => !this.selectedPrompts.includes(prompt) || prompt === selectedPrompt);
  }

  getLoggedSessions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.JOURNAL.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.AllData = response;
          this.JournallingData = this.AllData.journalLogs;

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

  openCreatePopup() {
    this.isPopupVisible = true;
  }

  closeCreatePopup() {
    this.isPopupVisible = false;
    this.resetForm();

  }

  get f(): { [key: string]: AbstractControl } {
    return this.journalForm.controls ;
  }

  get jd(): { [key: string]: AbstractControl } {
    return this.journalDetailForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;

  if (this.journalForm.invalid) {
    return;
  }

  const formData = this.journalForm.value;

  const requestBody: any = {
    studentId: this.userAuthService.getUserId(),
    journalType: formData.technique,
    question1:
      formData.prompt1 === 'custom' ? formData.customPrompt1 : formData.prompt1,
    answer1: formData.answer1,
    question2:
      formData.prompt2 === 'custom' ? formData.customPrompt2 : formData.prompt2,
    answer2: formData.answer2,
  };
  
    // Make the API call to save the data
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.JOURNAL.BASE, requestBody).subscribe(
      (response: any) => {
        // Update sessions after successful save

        setTimeout(() => {
          this.fetchUpdatedStudentPoints(); 
          // this.fetchBadgeMargin(); 
        }, 100); // Delay to ensure data consistency

        // this.checkAchievement(); 
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
    this.submitted = false;
    // this.popupCurrentPage = 1;
    this.journalForm.reset({
      technique: '',
    });
  }

  fetchUpdatedStudentPoints(): void {

    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.studentData = response; // Updated student data, including points
        this.pointsService.updateTotalMarks(this.studentData.totalMarks); // Update total points in the header or wherever it's displayed
        this.cdr.detectChanges(); // Trigger change detection to ensure UI reflects the updated points
  
        this.getLoggedSessions(); // Ensure this fetches latest data
  
      },
      (httpError: any) => {
        console.log(httpError);
      }
  
    );
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
          margin1: response.game5Margin1,
          margin2: response.game5Margin2,
        };
        this.completedTasks = response.game5Marks;
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
      ref = 'Game5Badge1'
    }
    else if (this.showBadge02 == true){
      badge = 'badge2';
      ref = 'Game5Badge2'
    }
 
    const requestBody = 

      {
        studentId : this.userAuthService.getUserId(),
        gameCode : "game5",
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

  }


  get totalPages(): number {
    // console.log(this.QnA.length);
    // return Math.ceil(this.JournallingData.length / this.JournalsPerPage);
    return Math.max(1, Math.ceil(this.JournallingData.length / this.JournalsPerPage));
  }

  get paginatedRecords(): any[] {
    const startIndex = (this.paginationCurrentPage - 1) * this.JournalsPerPage;
    return this.JournallingData.slice(startIndex, startIndex + this.JournalsPerPage);
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

openJournalDetailPopup(journal: any): void {
  this.selectedJournal = journal;
  this.journalDetailForm.patchValue({
    answer1: journal.answer1,
    answer2: journal.answer2,
  });
  this.isSaveEnabled = false; // Disable save button initially
  this.isJournalDetailPopupVisible = true;
}

closeJournalDetailPopup(): void {
  this.isJournalDetailPopupVisible = false;
}

onFieldChange(): void {
  // Marks the form as dirty when any answer field changes
  if (this.journalDetailForm.dirty) {
    // console.log('Changes detected');
  }

  
}

// checkForChanges(): void {
//   const { answer1, answer2 } = this.journalDetailForm.value;
//   this.isSaveEnabled =
//     answer1 !== this.selectedJournal.answer1 ||
//     answer2 !== this.selectedJournal.answer2;
// }

checkForChanges(): void {
  const answer1 = this.journalDetailForm.get('answer1')?.value;
  const answer2 = this.journalDetailForm.get('answer2')?.value;

  this.isSaveEnabled =
    answer1 !== this.selectedJournal?.answer1 ||
    answer2 !== this.selectedJournal?.answer2;
}

saveChanges(): void {

  if (this.isSaveEnabled) {
    this.selectedJournal.answer1 = this.journalDetailForm.value.answer1;
    this.selectedJournal.answer2 = this.journalDetailForm.value.answer2;
  }
  const requestBody: any = {
    studentId: this.userAuthService.getUserId(),
    logId: this.selectedJournal._id,
    answer1: this.selectedJournal.answer1,
    answer2: this.selectedJournal.answer2
  };


    this.apiCallService.executePostNoAuth(API_ENDPOINTS.JOURNAL.BASE, requestBody).subscribe(
      (response: any) => {

        // this.isSaveEnabled = false;
        this.closeJournalDetailPopup();
        this.getLoggedSessions();
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while saving the journal record");
      }

    );
}

openDeleteConfirmationPopup(selectedJournal: any): void {
  this.showDeleteConfirmationPopup = true; // Show confirmation popup
}

onDelete(selectedJournal: any): void {
  // if (confirm('Are you sure you want to delete this journal?')) {
  const studentId =  this.userAuthService.getUserId();
  this.apiCallService.executeDeleteNoAuth(API_ENDPOINTS.JOURNAL.BASE + '/' + studentId + '/' + selectedJournal._id)
  .subscribe(
    response => {
      this.closeJournalDetailPopup();
      this.cancelDelete(); // Close confirmation popup after deleting
      setTimeout(() => {
        this.fetchUpdatedStudentPoints(); 
        // this.fetchBadgeMargin();  
      }, 100); 
    },
    error => {
      console.error("Error deleting journal record:", error);
    }
  );


    // Emit or update the list to remove the journal if necessary
  }



cancelDelete(): void {
  this.showDeleteConfirmationPopup = false; // Hide confirmation popup
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

  openHelpPopup() {
    this.helpPopupVisible = true;
  }

  closeHelpPopup() {
    this.helpPopupVisible = false;
  }


}