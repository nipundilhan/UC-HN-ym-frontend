import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-tutorial-submission',
  templateUrl: './tutorial-submission.component.html',
  styleUrls: ['./tutorial-submission.component.css']
})
export class TutorialSubmissionComponent implements OnInit {

  studentTaskRootId : any;

  studentTute: StudentTasks = {
    _id: null,
    studentId: null,
    moduleCode: null,
    gameCode: null,
    tasks: [] // Initialize the tasks array as empty
  };

  form: FormGroup = new FormGroup({
    description: new FormControl(''),
    dateDone: new FormControl(''),
    compltePercentage: new FormControl(''),
    tuteName: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder , private userAuthService: UserAuthService , public apiCallService: ApiCallService , private router: Router ) {

  }

  ngOnInit(): void {
    this.studentTaskRootId= history.state.studentTaskId;
    

    this.form = this.formBuilder.group(
      {
        description: ['', Validators.required],
        dateDone: ['', Validators.required],
        compltePercentage: ['', Validators.required],
        tuteName: [
          '',
          [
            Validators.required,
            Validators.minLength(5)
          ],
        ]
      }
    );
  }


  onDateChange(event: any) {
    const date = event.target.value; // This will be in format "yyyy-mm-dd"
    //this.dob = date; // Directly assign the formatted date
    //alert(this.dob); // For debugging or further processing
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.studentTute._id = this.studentTaskRootId;
    this.studentTute.studentId = this.userAuthService.getUserId();
    this.studentTute.moduleCode = "MOD1";
    this.studentTute.gameCode = "GM1";
    
        // Create a new task object from form values
        const newTask: Tsk = {
          _id: null,
          name: this.form.value.tuteName,
          description: this.form.value.description,
          date: this.form.value.dateDone,
          completePercentage: Number(this.form.value.compltePercentage), // Convert to number
          points: 0 // Initialize points to 0 or any default value
        };
    
        // Add the new task to the tasks array
        this.studentTute.tasks.push(newTask);
    
        // Optional: Log the updated studentTute object for debugging
        console.log('Updated studentTute:', JSON.stringify(this.studentTute, null, 2));

    

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.TUTORIALS.BASE,this.studentTute).subscribe(
      (response: any) => {

        this.router.navigate(['/view-tutorials']);
        alert("you have successfully recorded");
  


      },
      (httpError: any) => {
        console.log(httpError);
        alert("incorrect username or password")
        
      }   
    );

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
