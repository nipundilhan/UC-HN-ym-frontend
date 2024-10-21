import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { PointsService } from 'src/app/_services/points.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { StudentTasks } from 'src/app/_shared/resources/StudentTask';

export interface Question {
  lesson: string;
  question: string;
  date: string; // Format: 'YYYY-MM-DD'
  answer: string;
  image?: string; // Optional image URL
}

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  questionForm: FormGroup;
  isQuestionOpen = false;
  selectedQuestion: any;
  studentData: any;
  questions: any[] = [];
  // isSaveEnabled = false;
  isAddQuestionModalOpen = false;
  isShareModalOpen = false
  submitted = false;
  originalQuestion: any;
  originalAnswer: string = '';
  loading = true;

  editorContent: string = '';  // This will store the editor's content

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    placeholder: 'Enter answer here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['underline'],
      ['redo'],
      ['undo'],
      ['insertImage', 'insertVideo'],
      ['heading'],
      ['clearFormatting'],
      ['Horizontal Line']
    ],
    // Adding a custom class to the editor
  };
  
  
  

  constructor(private fb: FormBuilder,
    public apiCallService: ApiCallService,
    private userAuthService: UserAuthService,
    private cdr: ChangeDetectorRef,
    private pointsService: PointsService,
    private router: Router,


  ) {
    this.questionForm = this.fb.group({
      lesson: ['', Validators.required],
      question: ['', Validators.required],
      // date: [this.getTodayDate(), Validators.required],
      answer: ['', Validators.required],
      // image: [null] // For image uploads
    });
  }

  ngOnInit(): void {
    this.getQuestions(); // Fetch existing questions

  }

  get isSaveEnabled(): boolean {
    return JSON.stringify(this.selectedQuestion) !== JSON.stringify(this.originalQuestion);
}


  getQuestions(): Promise<void>  {

    return new Promise((resolve, reject) => {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.QANDA.BASE+ "/" + this.userAuthService.getUserId()).subscribe(
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

  openModal(): void{
    this.isAddQuestionModalOpen = true;
  }


  closeAddQuestionModal(): void {
    this.isAddQuestionModalOpen = false;
    this.questionForm.reset();
  }

  get f() {
    return this.questionForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.questionForm.patchValue({
      image: file
    });
  }

  // onSubmit() {

  //   this.submitted = true;
  //   if (this.questionForm.invalid) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   for (const key in this.questionForm.value) {
  //     formData.append(key, this.questionForm.value[key]);
  //   }


  // }

  // Method to open question details
  openQuestionDetails(question: any): void {
    this.selectedQuestion = { ...question };
    this.originalQuestion = question.question;  // Store the original question
    this.originalAnswer = question.answer;      // Store the original answer
    this.isQuestionOpen = true;
  }

  // Method to check if the answer has changed
  hasAnswerChanged(): boolean {
    return (
      this.selectedQuestion.question !== this.originalQuestion ||  // Check if the question has changed
      this.selectedQuestion.answer !== this.originalAnswer         // Check if the answer has changed
    );
  }


  closeQuestionModal(): void {
    this.isQuestionOpen = false;
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
      this.selectedQuestion.image = URL.createObjectURL(file); // Temporary preview
    }
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  // Method to handle the sharing of the question
onShareQuestion(question: any): void {
  if (question.sharedStatus === 'NOT_SHARED') {

    const requestBody = {
      ownerStudentId: this.userAuthService.getUserId(),
      QandAId: this.selectedQuestion._id,
      sharedStatus: "SHARED"
    };

    this.apiCallService.executePutNoAuth(API_ENDPOINTS.QANDA.SHARE, requestBody).subscribe(
      (response: any) => {
        this.openShareModal();
        setTimeout(() => {
          this.getQuestions();  //update the points in header and fetches latest tutorial data
        }, 100);

        // Handle success response
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while sharing the question");
      }
    );

this.closeQuestionModal();
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

 // Method to navigate to the shared questions page
 viewSharedQuestions(): void {
  // Navigate to the shared questions page (assuming you have a route for this)
  this.router.navigate(['share/questions']);
}

  onUpdateQuestion(): void {
    // Save changes made to question

    const requestBody = {
      studentId: this.userAuthService.getUserId(),
      QandAId: this.selectedQuestion._id,
      lessonTitle: this.selectedQuestion.lessonTitle,
      question: this.selectedQuestion.question,
      answer: this.selectedQuestion.answer,
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.QANDA.BASE, requestBody).subscribe(
      (response: any) => {
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while saving the question");
      }
    );
    setTimeout(() => {
      this.getQuestions();  //update the points in header and fetches latest tutorial data
    }, 100);


    // this.getQuestions(); 
    this.questionForm.reset();
    // this.questionForm.patchValue({ date: this.getTodayDate() });
    // this.isSaveEnabled = false;
    this.closeQuestionModal();
  }

  deleteQuestion(question: any): void {
    this.questions = this.questions.filter(m => m !== question);
    this.closeQuestionModal();
  }

  fetchUpdatedStudentPoints(): void {

    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.studentData = response; // Updated student data, including points
        console.log(this.studentData);
        this.pointsService.updateTotalMarks(this.studentData.totalMarks); // Update total points in the header or wherever it's displayed
        this.cdr.detectChanges(); // Trigger change detection to ensure UI reflects the updated points
  
        this.getQuestions(); // Ensure this fetches latest data
  
      },
      (httpError: any) => {
        console.log(httpError);
      }
  
    );
    }

  onSubmit(): void {
    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }

    const requestBody = {
      studentId: this.userAuthService.getUserId(),
      lessonTitle: this.questionForm.value.lesson, 
      question: this.questionForm.value.question,  
      answer: this.questionForm.value.answer,  
    };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.QANDA.BASE, requestBody).subscribe(
      (response: any) => {
        // this.dataTrnfrSrvc.setData(response);
        
          setTimeout(() => {
            this.fetchUpdatedStudentPoints();  //update the points in header and fetches latest tutorial data
          }, 100); // Delay to ensure data consistency
         
        
          // this.checkAchievement(); // Check for achievement after data fetch
          
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while recording the question");
      }
    );
    this.questionForm.reset();
      this.closeAddQuestionModal(); // Close modal after saving
  }

  
}


