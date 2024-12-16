import { Component, EventEmitter, OnInit, OnDestroy, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, FormControl, Validators  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { StudentTasks } from 'src/app/_shared/resources/StudentTask';
import { Tsk } from 'src/app/_shared/resources/Task';
import { PointsService } from 'src/app/_services/points.service';


@Component({
  selector: 'app-view-tutorials',
  templateUrl: './view-tutorials.component.html',
  styleUrls: ['./view-tutorials.component.css']
})
export class ViewTutorialsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<void>();
  studentTaskRootId: any;
  studentTute: StudentTasks = {
    _id: null,
    studentId: null,
    moduleCode: null,
    gameCode: null,
    tasks: [] // Initialize the tasks array as empty
  };

  tutorialForm: FormGroup;
  submitted = false;
  studentData: any;
  loading = true;
  isModalOpen = false;
  isTaskModalOpen = false;
  isAchievementPopupOpen = false;
  selectedTask: any;
  // progressOptions: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; 
  originalTask: any;
  badgeClass: string = 'badge-grey'; // Initially grey
  // showPadlock: boolean = false;
  showBadge01: Boolean = false;
  showBadge02: Boolean = false;
  isSideNavOpen: boolean = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible

  currentPage: number = 1; // Current page number
  tutorialsPerPage: number = 6; // Number of questions to display per page
  tutorials: any[] = [];

  gamePoints: number = 0;
  gameMargins: { margin1: number; margin2: number } | null = null; 
  completedTasks: number = 0;
  showTooltip: string = ''; // Variable to hold the tooltip message

  showDeleteConfirmationPopup: boolean = false; // For delete confirmation

  isShareModalOpen: boolean = false;
  private submitEventSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public apiCallService: ApiCallService,
    private dataTrnfrSrvc: DataTransferService,
    private userAuthService: UserAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private pointsService: PointsService
  ) {
    this.tutorialForm = this.formBuilder.group({
      description: [''],
      date: [this.getTodayDate(), Validators.required], // Set default date to today
      status: ['', Validators.required],  // Add status field
      tutorialName: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.getStudentData();
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

  ngOnDestroy(): void {
    if (this.submitEventSubscription) {
      this.submitEventSubscription.unsubscribe();
    }
  }

  fetchBadgeMargin(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.gameMargins = {
          margin1: response.game1Margin1,
          margin2: response.game1Margin2,
        };
        this.completedTasks = response.game1CompletedTasks;
        console.log(this.gameMargins);
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

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];  // Returns 'YYYY-MM-DD' format
  }                             
  

  openTaskDetails(task: Task): void {
    // Make a shallow copy of the selected task to work with
    this.selectedTask = { ...task };
    this.originalTask = { ...task };
    this.isTaskModalOpen = true;
  }

  closeTaskModal(): void {
    this.isTaskModalOpen = false;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.tutorialForm.controls;
  }

  get isSaveEnabled(): boolean {
      return JSON.stringify(this.selectedTask) !== JSON.stringify(this.originalTask);
  }

  // get isStatusEditable(): boolean {
  //   return this.selectedTask.status !== 'Completed';
  // }

  isDropdownDisabled(): boolean {
    return this.originalTask.status === 'Completed'; 
    // Use originalTask to check if the record was already Completed when opened.
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  onUpdate(): void {
   // this.submitted = true;

    // this.studentTute._id = this.studentData._id;
    this.studentTute._id = this.studentData ? this.studentData._id : null;
    this.studentTute.studentId = this.userAuthService.getUserId();
    this.studentTute.moduleCode = 'MOD1';
    this.studentTute.gameCode = 'GM1';

    const newTask: Tsk = {
      _id: this.selectedTask._id,
      name: this.selectedTask.name,
      description: this.selectedTask.description,
      date: this.selectedTask.date,
      // completePercentage: Number(this.selectedTask.completePercentage),
      status: this.selectedTask.status,
      points: 0
    };

    this.studentTute.tasks.push(newTask);
    
      // Make an API call to save the tutorial
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.TUTORIALS.BASE, this.studentTute).subscribe(
       (response: any) => {
        //this.dataTrnfrSrvc.setData(response);
        this.submitEvent.emit();

        this.studentTute.tasks=[];
 
        this.getStudentData(); // Refresh the data

        if (newTask.status === 'Completed'){
          this.checkAchievement(); // Check for achievement after data fetch
       }

       setTimeout(() => {
        this.fetchUpdatedStudentPoints();
        this.fetchBadgeMargin();  //update the points in header and fetches latest tutorial data
      }, 100); // Delay to ensure data consistency


        this.closeTaskModal(); // Close modal after saving
        this.tutorialForm.reset();
        this.tutorialForm.patchValue({ date: this.getTodayDate() });

      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while recording the tutorial");
      }
    );

    console.log('Saving changes:', this.selectedTask);   
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.onReset(); // Reset the form and submission state

  }

  getStudentData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.TUTORIALS.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.studentData = response;
          this.tutorials = this.studentData.module1.game1.tasks;
          this.gamePoints = this.studentData.module1.game1.gamePoints;
          this.cdr.detectChanges();
          this.loading = false;
          resolve(); // Resolve the promise after the data is successfully fetched
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
          reject(error); // Reject the promise in case of an error
        }
      );
    });
  }

  checkAchievement(): void {

    const gamePoints = this.studentData.module1.game1.gamePoints;
    console.log(gamePoints);
  
    // Ensure badges are reset at the beginning
    this.showBadge01 = false;
    this.showBadge02 = false;
  
    // Show badge based on game points
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
    else if (gamePoints === 4) {
      this.isAchievementPopupOpen = true; // Show achievement popup
  
      // Show the padlock initially
      this.isPadlockVisible = true;
  
      // Fade out the padlock after 2.5 seconds
      setTimeout(() => {
        this.isPadlockVisible = false; // Hide padlock
      }, 2500);
  
      this.showBadge02 = true; // Show badge 02
      this.badgeClass = 'unlocking-animation'; // Trigger badge animation
    }
  }
  

  shareAchievement(): void {
    this.isAchievementPopupOpen = false;
    let badge = '';
    let ref = '';

    if (this.showBadge01 == true){
      badge = 'badge1';
      ref = 'Game1Badge1'
    }
    else if (this.showBadge02 == true){
      badge = 'badge2';
      ref = 'Game1Badge2'
    }
 
    const requestBody = 

      {
        studentId : this.userAuthService.getUserId(),
        gameCode : "game1",
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

  onSubmit(): void {
    this.submitted = true;
    if (this.tutorialForm.invalid) {
      return;
    }
  
    this.studentTute._id = this.studentData ? this.studentData._id : null;
    this.studentTute.studentId = this.userAuthService.getUserId();
    this.studentTute.moduleCode = 'MOD1';
    this.studentTute.gameCode = 'GM1';
  
    const newTask: Tsk = {
      _id: null,
      name: this.tutorialForm.value.tutorialName,
      description: this.tutorialForm.value.description,
      date: this.tutorialForm.value.date,
      // completePercentage: Number(this.tutorialForm.value.progress),
      status: this.tutorialForm.value.status, // Handle status here
      points: 0
    };
  
    this.studentTute.tasks.push(newTask);

          // Make an API call to save the tutorial
          this.apiCallService.executePostNoAuth(API_ENDPOINTS.TUTORIALS.BASE, this.studentTute).subscribe(
            (response: any) => {
          this.dataTrnfrSrvc.setData(response);
          this.submitEvent.emit();
        
          setTimeout(() => {
            this.fetchUpdatedStudentPoints(); 
            this.fetchBadgeMargin();  //update the points in header and fetches latest tutorial data
          }, 100); // Delay to ensure data consistency
         
          if (newTask.status === 'Completed'){
           this.checkAchievement(); // Check for achievement after data fetch
          }

          this.closeModal(); // Close modal after saving
          

          this.tutorialForm.reset();
          this.studentTute.tasks=[];

          this.tutorialForm.patchValue({ status: 'Started' });
          this.tutorialForm.patchValue({ date: this.getTodayDate() });
        },
        (httpError: any) => {
    console.log(httpError);
    alert("An error occurred while recording the tutorial");
      }
    );
  }

  fetchUpdatedStudentPoints(): void {

  this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
    (response: any) => {
      this.studentData = response; // Updated student data, including points
      console.log(this.studentData);
      this.pointsService.updateTotalMarks(this.studentData.totalMarks); // Update total points in the header or wherever it's displayed
      this.cdr.detectChanges(); // Trigger change detection to ensure UI reflects the updated points

      this.getStudentData(); // Ensure this fetches latest data

    },
    (httpError: any) => {
      console.log(httpError);
    }

  );
  }


  onReset(): void {
    this.submitted = false;
    this.tutorialForm.reset();
    this.tutorialForm.patchValue({ date: this.getTodayDate() });
  }

  openDeleteConfirmationPopup(): void {
    this.showDeleteConfirmationPopup = true; // Show confirmation popup
    // this.isTaskModalOpen = true;
  }
  
  cancelDelete(): void {
    this.showDeleteConfirmationPopup = false; // Hide confirmation popup
  }

  deleteTask(task: any): void {
    // const confirmDelete = confirm(`Are you sure you want to delete the tutorial/lab: ${task.name}?`);
        this.apiCallService.executeDeleteNoAuth(API_ENDPOINTS.TUTORIALS.BASE + '/' + this.studentData._id + '/' + task._id)
          .subscribe(
            response => {
              this.closeTaskModal();
              this.cancelDelete(); // Close confirmation popup after deleting
              this.getStudentData(); // Refresh the data

            },
            error => {
              console.error("Error deleting task:", error);
              alert("An error occurred while deleting the task.");
            }
          );

     // }
    // }
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Started':
        return 'status-started';
      case 'In Progress':
        return 'status-in-progress';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-default'; // Fallback class if the status doesn't match any known value
    }
  }


  get totalPages(): number {
    // return Math.ceil(this.tutorials.length / this.tutorialsPerPage);
    return Math.max(1, Math.ceil(this.tutorials.length / this.tutorialsPerPage));

  }

  get paginatedQuestions(): any[] {
    const startIndex = (this.currentPage - 1) * this.tutorialsPerPage;
    return this.tutorials.slice(startIndex, startIndex + this.tutorialsPerPage);
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
}
