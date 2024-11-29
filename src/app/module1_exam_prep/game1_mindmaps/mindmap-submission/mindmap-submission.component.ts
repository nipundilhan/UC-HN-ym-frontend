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
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PointsService } from 'src/app/_services/points.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  originalImage: any;
  originalDescription: any;
  isSaveEnabled = false;
  selectedFile: File | null = null;
  isAchievementPopupOpen = false;
  loading = true;
  studentData: any;
  badgeClass: string = 'badge-grey'; // Initially grey
  // showPadlock: boolean = false;
  showBadge01: Boolean = false;
  showBadge02: Boolean = false;
  showBadgeLikes: Boolean = false;
  isPadlockVisible: boolean = false;  // Declare isPadlockVisible
  fileSizeError: boolean = false;

  gamePoints: number = 0;
  totalLikesCount: number = 0;
  showTooltip: string = ''; // Variable to hold the tooltip message
  gameMargins: { margin1: number; margin2: number; LikesMargin: number } | null = null; 
  completedTasks: number = 0;
  TotalLikes: number = 0;
  isShareModalOpen = false;



  uploadedFiles: File[] = [];
  filePreviews: SafeUrl[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public apiCallService: ApiCallService,
    private dataTrnfrSrvc: DataTransferService,
    private userAuthService: UserAuthService,
    private cdr: ChangeDetectorRef,
    private pointsService: PointsService,
    private sanitizer: DomSanitizer // Inject DomSanitizer


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
    this.fetchBadgeMargin();

  }


  fetchBadgeMargin(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.gameMargins = {
          margin1: response.game3Margin1,
          margin2: response.game3Margin2,
          LikesMargin: response.game3LikesMargin,
        };
        this.completedTasks = response.game3Marks;
        this.TotalLikes = response.game3Likes;
        console.log(this.gameMargins);
        console.log(this.TotalLikes);
      },
      (httpError: any) => {
        console.log(httpError);
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
  
        this.getMindmaps(); // Ensure this fetches latest data
  
      },
      (httpError: any) => {
        console.log(httpError);
      }
  
    );
    }

  get f() {
    return this.mindmapForm.controls;
  }
  
  getMindmaps(): Promise<void>  {

    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MINDMAPS.BASE+ "/" + this.userAuthService.getUserId()).subscribe(
        (response: any) => {
          this.studentData = response;
          this.mindmaps = this.studentData.mindMaps;
          // console.log(this.QnA);
          this.gamePoints = this.studentData.gamePoints;
          this.totalLikesCount = this.studentData.totalLikesCount; 
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

  openMindmapModal(): void {
    this.isAddMindmapModalOpen = true;
  }

  onFileSelected(event: any): void {
    this.uploadedFiles = [];
    this.filePreviews=[];

    const files = event.target.files;
    const maxFileSize = 1 * 1024 * 1024; // 1 MB
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    const maxFilesAllowed = 1; // Maximum allowed files

    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      if (this.uploadedFiles.length >= maxFilesAllowed) {
        alert(`You can only upload a maximum of ${maxFilesAllowed} files.`);
        break; // Stop processing further files
      }

      // Check file size
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the maximum size of 1 MB.`);
        continue; // Skip this file
      }
  
      // Check file type
      if (!allowedFileTypes.includes(file.type)) {
        alert(`File type of ${file.name} is not allowed. Only JPG and PNG are allowed.`);
        continue; // Skip this file
      }

      this.uploadedFiles.push(file); // Add each valid file to the array
      const filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.filePreviews.push(filePreview); 
    }
    this.cdr.detectChanges(); // Trigger change detection
  }

  closeAddMindmapModal(): void {
    this.isAddMindmapModalOpen = false;
    this.mindmapForm.reset();
    this.uploadedFiles=[];
    this.filePreviews=[];
    // this.mindmapForm.patchValue({ date: this.getTodayDate() });
    // this.mindmapForm.patchValue({ status: 'Started'});

  }

  onSubmitMindmap(): void {
    this.submitted = true;
    if (this.mindmapForm.invalid || this.fileSizeError) {
      this.mindmapForm.markAllAsTouched();
      return;
    }

    // const newMindmap = {
    //   title: this.mindmapForm.value.title,
    //   description: this.mindmapForm.value.description,
    //   image: this.selectedFile ? URL.createObjectURL(this.selectedFile) : '/assets/default-mindmap.png'
    // };

    const formData = new FormData();
    formData.append('studentId', this.userAuthService.getUserId());
    formData.append('title', this.mindmapForm.get('title')!.value);
    formData.append('description', this.mindmapForm.get('description')!.value);

    this.uploadedFiles.forEach(file => {
      formData.append('attachments', file); // Append each file to the FormData
    });

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.MINDMAPS.BASE, formData).subscribe(
      (response: any) => {
        
        // this.checkAchievement();
        this.uploadedFiles = [];
          setTimeout(() => {
            this.fetchUpdatedStudentPoints(); 
            this.fetchBadgeMargin();  //update the points in header and fetches latest tutorial data
          }, 100); // Delay to ensure data consistency

          this.checkAchievement(); // Check for achievement after data fetch
          
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while recording the question");
      }
    );
    this.mindmapForm.reset();
    this.submitted = false;
    this.closeAddMindmapModal(); // Close modal after submission
  }

  // openMindmapDetails(mindmap: any): void {
  //   this.selectedMindmap = mindmap;
  //   this.isMindmapModalOpen = true;
  // }



    // Method to open mindmap details
    openMindmapDetails(mindmap: any): void {
      this.selectedMindmap = { ...mindmap };
      this.uploadedFiles=[];
      this.filePreviews=[];
      const attachments = this.selectedMindmap.attachments;

      attachments.forEach((attachment: any) => {
        // Convert the base64 string back to a Blob and create a File object
        const byteString = atob(attachment.data);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
        
        const blob = new Blob([uint8Array], { type: attachment.contentType });
        const file = new File([blob], attachment.filename, { type: attachment.contentType });

        // Push the file to uploadedFiles array
        this.uploadedFiles.push(file);

        // Create a preview URL for each file and store it in the filePreviews array
        const filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
        this.filePreviews.push(filePreview);
      });



      // this.originalImage = mindmap.image;  // Store the original mindmap image
      this.originalDescription= mindmap.description;      // Store the original mindmap description
      this.isMindmapModalOpen = true;
    }
    viewFile(file: File) {
      const fileUrl = URL.createObjectURL(file); // Create a blob URL for the file
      window.open(fileUrl, '_blank');  // Open the file in a new tab
    }
    
    // Method to check if the answer has changed
    hasAnswerChanged(): boolean {
      return (
        // this.selectedMindmap.image !== this.originalImage ||  // Check if the question has changed
        this.selectedMindmap.description !== this.originalDescription         // Check if the answer has changed
      );
    }

  closeMindmapModal(): void {
    this.isMindmapModalOpen = false;
  }

  onUpdateMindmap(): void {
  
    const formData = new FormData();

    formData.append('mindMapId', this.selectedMindmap._id);
    formData.append('studentId', this.userAuthService.getUserId());
    formData.append('title', this.selectedMindmap.title);
    formData.append('description', this.selectedMindmap.description);

    this.uploadedFiles.forEach(file => {
      formData.append('attachments', file); // Append each file to the FormData
    });

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.MINDMAPS.BASE, formData).subscribe(
      (response: any) => {
        
        // this.checkAchievement();
        this.uploadedFiles = [];

        this.closeMindmapModal();
        this.getMindmaps(); 
          
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while saving the mindmap");
      }
    );

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

  hasEarnedBadge(margin: number | null | undefined): boolean {
    if (margin === null || margin === undefined) {
        return false; // or handle the case as needed
    }
    return this.gamePoints >= margin;
  }

  hasEarnedLikesBadge(margin: number | null | undefined): boolean {
    if (margin === null || margin === undefined) {
      return false; // or handle the case as needed
  }
  return this.totalLikesCount >= margin;
}

  checkAchievement(): void {

    const gamePoints = this.studentData.gamePoints;
    // console.log(gamePoints);
  
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
    this.router.navigate(['/achievements']);
  }

  onShareMindmap(mindmap: any): void {
    if (mindmap.sharedStatus === 'NOT_SHARED') {
  
      const requestBody = {
        ownerStudentId: this.userAuthService.getUserId(),
        QandAId: this.selectedMindmap._id,
        sharedStatus: "SHARED"
      };
  
      this.apiCallService.executePutNoAuth(API_ENDPOINTS.QANDA.SHARE, requestBody).subscribe(
        (response: any) => {
          this.openShareModal();
          setTimeout(() => {
            this.getMindmaps();  //update the points in header and fetches latest tutorial data
          }, 100);
  
          // Handle success response
        },
        (httpError: any) => {
          console.log(httpError);
          alert("An error occurred while sharing the question");
        }
      );
  
  this.closeMindmapModal();
      // Update the sharedStatus to 'yes' after sharing
      // question.sharedStatus = 'SHARED';
    }
  }

  // Method to open the share success popup
openShareModal(): void {
  this.isShareModalOpen = true;
}

// Method to close the share success popup
closeShareModal(): void {
  this.isShareModalOpen = false;
}

viewSharedMindmaps(): void {
  // Navigate to the shared questions page (assuming you have a route for this)
  this.router.navigate(['share/questions']);
}

  
}
