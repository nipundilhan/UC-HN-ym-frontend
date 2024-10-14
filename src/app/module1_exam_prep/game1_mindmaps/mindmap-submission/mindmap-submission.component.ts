import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { StudentTasks } from 'src/app/_shared/resources/StudentTask';
import { Tsk } from 'src/app/_shared/resources/Task';

@Component({
  selector: 'app-mindmap-submission',
  templateUrl: './mindmap-submission.component.html',
  styleUrls: ['./mindmap-submission.component.css']
})
export class MindmapSubmissionComponent implements OnInit {
  mindmapForm: FormGroup;
  mindmaps: any[] = [];
  submitted = false;
  isMindmapModalOpen = false;
  isAddMindmapModalOpen = false;
  selectedMindmap: any;
  isSaveEnabled = false;
  selectedFile: File | null = null;
  isAchievementPopupOpen = false;
  loading = true;
  studentData: any;
  badgeClass: string = 'badge-grey'; // Initially grey
  // showPadlock: boolean = false;
  showBadge: Boolean = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public apiCallService: ApiCallService,
    private dataTrnfrSrvc: DataTransferService,
    private userAuthService: UserAuthService,
    private cdr: ChangeDetectorRef,

  ) {
    this.mindmapForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: [this.getTodayDate(), Validators.required],
      description: ['', Validators.required],
      status: ['Started', Validators.required], 
      image: [null] // Image placeholder
 
    });
  }

  ngOnInit(): void {
    this.getMindmaps(); // Fetch existing mindmaps
    this.getStudentData();
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

  get f() {
    return this.mindmapForm.controls;
  }

  getMindmaps(): void {
    // Fetch mindmaps from backend or service
    this.mindmaps = [
      { title: 'Introduction to the project and Git', 
        description: 'This tutorial will introduce the concept of version control and show you the basics of working with the code management system known as Git.', 
        status: 'Completed', 
        date: '2024-09-30', 
        image: null  },

      { title: 'Decisions and Loops', 
        description: 'about calling methods, method parameters, local variables and method overloading. You will also learn how to use if-statements, switch-statements, for-loops, while-loops, arrays and collections. You will get to use these constructs to create solutions to some more complex problems', 
        status:'In Progress', 
        date: '2024-09-30', 
        image: '/assets/mind-map.jpg'  },
      
        { title: 'Unit Testing', 
          description: 'about calling methods, method parameters, local variables and method overloading. You will also learn how to use if-statements, switch-statements, for-loops, while-loops, arrays and collections. You will get to use these constructs to create solutions to some more complex problems', 
          status:'In Progress', 
          date: '2024-09-30', 
          image: '/assets/mind-map.jpg'  },

          { title: 'JUnit Testing', 
            description: 'about calling methods, method parameters, local variables and method overloading. You will also learn how to use if-statements, switch-statements, for-loops, while-loops, arrays and collections. You will get to use these constructs to create solutions to some more complex problems', 
            status:'In Progress', 
            date: '2024-09-30', 
            image: '/assets/mind-map.jpg'  }
    ];
  }

  openMindmapModal(): void {
    this.isAddMindmapModalOpen = true;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  closeAddMindmapModal(): void {
    this.isAddMindmapModalOpen = false;
    this.mindmapForm.reset();
  }

  onSubmitMindmap(): void {
    this.submitted = true;
    if (this.mindmapForm.invalid) {
      return;
    }

    const newMindmap = {
      title: this.mindmapForm.value.title,
      date: this.mindmapForm.value.date,
      description: this.mindmapForm.value.description,
      status: this.mindmapForm.value.status,
      image: this.selectedFile ? URL.createObjectURL(this.selectedFile) : '/assets/default-mindmap.png'
    };

    this.mindmaps.push(newMindmap); // Add new mindmap to the list
    this.closeAddMindmapModal(); // Close modal after submission
  }

  openMindmapDetails(mindmap: any): void {
    this.selectedMindmap = mindmap;
    this.isMindmapModalOpen = true;
  }

  closeMindmapModal(): void {
    this.isMindmapModalOpen = false;
  }

  onUpdateMindmap(): void {
    // Save changes made to mindmap
    this.isSaveEnabled = false;
    this.closeMindmapModal();
  }

  deleteMindmap(mindmap: any): void {
    this.mindmaps = this.mindmaps.filter(m => m !== mindmap);
    this.closeMindmapModal();
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  triggerImageUpload(): void {
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput.click();
  }
  
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Process the selected image file (e.g., upload it or display a preview)
      this.selectedMindmap.image = URL.createObjectURL(file); // Temporary preview
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
  checkAchievement(): void {

    const gamePoints = this.studentData.module1.game1.gamePoints;
    console.log(gamePoints);

    if (gamePoints === 4) {
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
  
  
}
