import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  questions: any[] = [];
  isSaveEnabled = false;
  isAddQuestionModalOpen = false;
  submitted = false;

  
  constructor(private fb: FormBuilder) {
    this.questionForm = this.fb.group({
      lesson: ['', Validators.required],
      question: ['', Validators.required],
      date: [this.getTodayDate(), Validators.required],
      answer: ['', Validators.required],
      image: [null] // For image uploads
    });
  }

  ngOnInit(): void {
    this.getQuestions(); // Fetch existing questions

  }


  getQuestions(): void {
    // Fetch mindmaps from backend or service
    this.questions = [
      {
        lesson: "Java Basics",
        question: "What are the advantages of Packages in Java?",
        date: "2024-10-01",
        answer: "Packages avoid name clashes. The Package provides easier access control. We can also have the hidden classes that are not visible outside and are used by the package. It is easier to locate the related classes.",
        image: null, // Dummy image URL
      },
      {
        lesson: "Java Basics",
        question: "What are the different data types in Java?",
        date: "2024-10-02",
        answer: "boolean, byte, char, short, int, long, float, double",
        image: "/assets/placeholder-mindmap.jpg", // Dummy image URL
      },
      {
        lesson: "Java Basics",
        question: "What are the advantages of Packages in Java?",
        date: "2024-10-01",
        answer: "Packages avoid name clashes. The Package provides easier access control. We can also have the hidden classes that are not visible outside and are used by the package. It is easier to locate the related classes.",
        image: null, // Dummy image URL
      }
    ];
  }

  openQuestionModal(): void {
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

  onSubmit() {

    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }

    const formData = new FormData();
    for (const key in this.questionForm.value) {
      formData.append(key, this.questionForm.value[key]);
    }

    // Call your service to submit the form data
    // this.apiService.createQuestion(formData).subscribe(response => { ... });
  }

  openQuestionDetails(question: any): void {
    this.selectedQuestion = question;
    this.isQuestionOpen = true;
    console.log("open");
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

  onUpdateQuestion(): void {
    // Save changes made to mindmap
    this.isSaveEnabled = false;
    this.closeQuestionModal();
  }

  deleteQuestion(question: any): void {
    this.questions = this.questions.filter(m => m !== question);
    this.closeQuestionModal();
  }

}
