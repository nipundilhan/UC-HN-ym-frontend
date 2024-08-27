import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from '../../../_shared/utils/validationUtils';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { Router } from '@angular/router';
import { StudentTasks } from 'src/app/_shared/resources/StudentTask';
import { Tsk } from 'src/app/_shared/resources/Task';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';

@Component({
  selector: 'app-tutorial-submission',
  templateUrl: './tutorial-submission.component.html',
  styleUrls: ['./tutorial-submission.component.css']
})
export class TutorialSubmissionComponent implements OnInit {
  @Output() submitEvent = new EventEmitter<void>();
  studentData : any;

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
  progressOptions: string[] = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    public apiCallService: ApiCallService,
    private dataTrnfrSrvc: DataTransferService, 
    private router: Router
  ) {
    // Initialize form
    this.tutorialForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      progress: ['', Validators.required],
      tutorialName: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ]
    });
  }

  ngOnInit(): void {
    //this.studentTaskRootId = history.state.studentTaskId;
    this.dataTrnfrSrvc.data$.subscribe(data => {
      //alert(data);
      this.studentData = data;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.tutorialForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.tutorialForm.invalid) {
      return;
    }

    this.studentTute._id = this.studentData._id;
    this.studentTute.studentId = this.userAuthService.getUserId();
    this.studentTute.moduleCode = 'MOD1';
    this.studentTute.gameCode = 'GM1';

    // Create a new task object from form values
    const newTask: Tsk = {
      _id: null,
      name: this.tutorialForm.value.tutorialName,
      description: this.tutorialForm.value.description,
      date: this.tutorialForm.value.date,
      completePercentage: Number(this.tutorialForm.value.progress.replace('%', '')), // Convert to number
      points: 0 // Initialize points to 0 or any default value
    };

    // Add the new task to the tasks array
    this.studentTute.tasks.push(newTask);

    // Optional: Log the updated studentTute object for debugging
    console.log('Updated studentTute:', JSON.stringify(this.studentTute, null, 2));

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.TUTORIALS.BASE, this.studentTute).subscribe(
      (response: any) => {
       this.submitEvent.emit();
      //  this.router.navigate(['/home']);
       
        // alert("You have successfully recorded");
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while recording the tutorial");
      }
    );

    console.log(JSON.stringify(this.tutorialForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.tutorialForm.reset();
  }

}
