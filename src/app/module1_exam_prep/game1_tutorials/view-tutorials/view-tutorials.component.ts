import { Component, EventEmitter, OnInit, OnDestroy, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { StudentTasks } from 'src/app/_shared/resources/StudentTask';
import { Tsk } from 'src/app/_shared/resources/Task';

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
  progressOptions: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; 
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
    private renderer: Renderer2
  ) {
    this.tutorialForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: [this.getTodayDate(), Validators.required], // Set default date to today
      progress: ['', Validators.required],
      tutorialName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getStudentData();
    // this.subscribeToSubmitEvents();
  }

  ngOnDestroy(): void {
    if (this.submitEventSubscription) {
      this.submitEventSubscription.unsubscribe();
    }
  }

  // subscribeToSubmitEvents(): void {
  //   this.submitEventSubscription = this.dataTrnfrSrvc.submitEvent$.subscribe(() => {
  //     this.getStudentData();
  //   });
  // }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];  // Returns 'YYYY-MM-DD' format
  }
  

  openTaskDetails(task: Task): void {
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

  get isProgressEditable(): boolean {
    return this.selectedTask.completePercentage !== 100;
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
      completePercentage: Number(this.selectedTask.completePercentage),
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

        setTimeout(() => {
          this.checkAchievement(); // Check for achievement after data fetch
        }, 100); 

        this.closeTaskModal(); // Close modal after saving

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

  // goToAddTute(): void {
  //   this.router.navigate(['/tutorial-submission'], { state: { studentTaskId: this.studentData ? this.studentData._id : null } });
  // }

  getStudentData(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.TUTORIALS.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.studentData = response;
        this.dataTrnfrSrvc.setData(this.studentData);
        this.cdr.detectChanges();
        this.loading = false;
      },
      (httpError: any) => {
        console.log("hello");
        console.log(httpError);
        this.loading = false;
      }
    );
  }

  checkAchievement(): void {
    const completedTasks = this.studentData.module1.game1.tasks.filter((task: any) => task.completePercentage === 100);  
  
    if (completedTasks.length === 5) {
      this.isAchievementPopupOpen = true; // Show achievement popup
  
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

    // this.studentTute._id = this.studentData._id;
    this.studentTute._id = this.studentData ? this.studentData._id : null;
    this.studentTute.studentId = this.userAuthService.getUserId();
    this.studentTute.moduleCode = 'MOD1';
    this.studentTute.gameCode = 'GM1';

    const newTask: Tsk = {
      _id: null,
      name: this.tutorialForm.value.tutorialName,
      description: this.tutorialForm.value.description,
      date: this.tutorialForm.value.date,
      completePercentage: Number(this.tutorialForm.value.progress),
      points: 0
    };

    this.studentTute.tasks.push(newTask);

      // Make an API call to save the tutorial
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.TUTORIALS.BASE, this.studentTute).subscribe(
      (response: any) => {
        this.dataTrnfrSrvc.setData(response);
        this.submitEvent.emit();

        this.getStudentData(); // Ensure this fetches latest data

        setTimeout(() => {
          this.checkAchievement(); // Check for achievement after data fetch
        }, 100); // Delay to ensure data consistency

        this.closeModal(); // Close modal after saving

        this.tutorialForm.reset();
        this.studentTute.tasks=[];
 
        this.tutorialForm.patchValue({ progress: '' });
        this.tutorialForm.patchValue({ date: this.getTodayDate() });
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while recording the tutorial");
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
  
}
