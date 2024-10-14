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
  showBadge: Boolean = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible



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
      description: ['', Validators.required],
      date: [this.getTodayDate(), Validators.required], // Set default date to today
      // progress: ['', Validators.required],
      status: ['', Validators.required],  // Add status field
      tutorialName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getStudentData();
  }

  ngOnDestroy(): void {
    if (this.submitEventSubscription) {
      this.submitEventSubscription.unsubscribe();
    }
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

    // if (this.selectedTask.status === 'Completed') {
    //   this.tutorialForm.get('taskStatus')?.disable();
    // } else {
    //   this.tutorialForm.get('taskStatus')?.enable();
    // }
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

  get isStatusEditable(): boolean {
    return this.selectedTask.status !== 'Completed';
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

    // let achievementUnlocked = false; // Flag to check if the achievement has already been unlocked

    // const completedTasks = this.studentData.module1.game1.tasks.filter((task: any) => task.completePercentage === 100);  
    const gamePoints = this.studentData.module1.game1.gamePoints;
    console.log(gamePoints);
    // Check if the game points equal 5
    if (gamePoints === 4) {
    this.isAchievementPopupOpen = true; // Show achievement popup

    // achievementUnlocked = true;

    // Show the padlock initially
    this.isPadlockVisible = true;

     // Fade out the padlock after 4 seconds (by reducing opacity)
     setTimeout(() => {
      this.isPadlockVisible = false; // Set opacity to 0 (invisible)
    }, 2500);

    this.showBadge = true; //show badge
    this.badgeClass = 'unlocking-animation'; // Trigger badge color change after padlock disappears
  
    }
  }
  

  shareAchievement(): void {
    this.isAchievementPopupOpen = false;
    this.router.navigate(['/achievements']);
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
            this.fetchUpdatedStudentPoints();  //update the points in header and fetches latest tutorial data
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
  }


  deleteTask(task: any): void {
    const confirmDelete = confirm(`Are you sure you want to delete the task: ${task.name}?`);
    if (confirmDelete) {
      // const taskIndex = this.studentData.module1.game1.tasks.findIndex((t: any) => t._id === task._id);
      // if (taskIndex !== -1) {
      //   this.studentData.module1.game1.tasks.splice(taskIndex, 1);
        
        // Update the backend with the new task list
        this.apiCallService.executeDeleteNoAuth(API_ENDPOINTS.TUTORIALS.BASE + '/' + this.studentData._id + '/' + task._id)
          .subscribe(
            response => {
              this.getStudentData(); // Refresh the data
            },
            error => {
              console.error("Error deleting task:", error);
              alert("An error occurred while deleting the task.");
            }
          );
     // }
    }
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
}
