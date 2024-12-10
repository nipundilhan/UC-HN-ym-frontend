import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/_secondary_services/data-transfer.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { UserSignup } from 'src/app/_shared/resources/UserSignup';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userType: 'STUDENT' | 'INSTRUCTOR' = 'STUDENT'; // Default to 'students'
  users: any[] = []; // Replace `any` with your user model
  showAddUserPopup: boolean = false;
  showEditUserPopup: boolean = false; // For edit user popup
  showDeleteConfirmationPopup: boolean = false; // For delete confirmation
  selectedUser: any = null; // Store user details for editing
  userToDelete: any = null;  // Store user to delete

  studentCount: number = 0;
  instructorCount: number = 0;

  newUser: any = {
    role: '',
    username: '',
    password: '',
    email: '',
    dob: '',
    gender: '',
    avatarCode: ''
  };

  currentPage: number = 1; // Current page number
  UsersPerPage: number = 10; // Number of questions to display per page

  constructor(
    public apiCallService: ApiCallService, 
    private router: Router, 
    private dataTrnfrSrvc: DataTransferService, 
    private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.getStudents();    // Fetch student count
      this.getInstructors(); 
      this.loadUsers(this.userType); // Load users on initialization
    }
  
    loadUsers(type: 'STUDENT' | 'INSTRUCTOR'): void {
      this.userType = type; // Update user type
      if (type === 'STUDENT') {
        this.users = this.getStudents(); // Fetch students
      } else if (type === 'INSTRUCTOR') {
        this.users = this.getInstructors(); // Fetch instructors
      }
    }

    getStudents(): any[] {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.USERS.GET_STUDENTS).subscribe(
        (response: any) => {
          this.users = response.users;
           this.studentCount = response.totalCount;
        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );

      return this.users;
    }

    getInstructors(): any[]  {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.USERS.GET_INSTRUCTORS).subscribe(
        (response: any) => {
          this.users = response.users;
          this.instructorCount = response.totalCount;

        },
        (error) => {
          console.error('Error loading users:', error);
        }
      );

      return this.users;
    }
  

  switchToStudents(): void {
    this.loadUsers('STUDENT'); // Load students
  }

  switchToInstructors(): void {
    this.loadUsers('INSTRUCTOR'); // Load instructors
  }

  openAddUserPopup(): void {
    this.showAddUserPopup = true;
  }

  closeAddUserPopup(): void {
    this.showAddUserPopup = false;
    this.clearFormFields();
  }

  addUser() {
    let userData: any;
    let path: any;

    if (this.newUser.role === 'student') {
      path = API_ENDPOINTS.USERS.SIGNUP;
      userData = {
        role: 'student',
        username: this.newUser.username,
        password: this.newUser.password,
        email: this.newUser.email,
        dob: this.newUser.dob,
        gender: this.newUser.gender,
        avatarCode: 'default'
      };
    } else if (this.newUser.role === 'instructor') {
      path = API_ENDPOINTS.USERS.SIGNUP_INSTRUCTOR;
      userData = {
        role: 'instructor',
        username: this.newUser.username,
        password: this.newUser.password,
        email: this.newUser.email,
        gender: this.newUser.gender,
        avatarCode: 'default'
      };
    }

    this.apiCallService.executePostNoAuth(path, userData).subscribe(
      (response: any) => {
       
        this.clearFormFields();
        this.closeAddUserPopup();
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

  onRoleChange() {
    // Optional: Clear form fields if needed when switching between roles
    this.clearFormFields();
  }
  
  clearFormFields() {
    this.newUser.username = '';
    this.newUser.name = '';
    this.newUser.dob = '';
    this.newUser.email = '';
    this.newUser.gender = '';
    this.newUser.password = '';
    this.newUser.role = '';
  }
  

  openEditUserPopup(user: any): void {
    this.selectedUser = { ...user }; // Clone the user object to edit
    this.showEditUserPopup = true; // Show edit popup
  }

  closeEditUserPopup(): void {
    this.showEditUserPopup = false; // Close the edit popup
    this.selectedUser = null; // Reset the selected user
  }

  updateUser(): void {
    // Logic to update user in the list
    const index = this.users.findIndex(u => u.id === this.selectedUser.id);
    if (index !== -1) {
      this.users[index] = { ...this.selectedUser }; // Update user data
    }
    this.closeEditUserPopup();
  }

  openDeleteConfirmationPopup(user: any): void {
    this.userToDelete = user; // Store the user to be deleted
    this.showDeleteConfirmationPopup = true; // Show confirmation popup
  }

  confirmDelete(): void {
    // Logic to delete the user
    this.users = this.users.filter(u => u.id !== this.userToDelete.id);
    this.cancelDelete(); // Close confirmation popup after deleting
  }

  cancelDelete(): void {
    this.showDeleteConfirmationPopup = false; // Hide confirmation popup
    this.userToDelete = null; // Reset user to delete
  }


  get totalPages(): number {
    // console.log(this.QnA.length);
    return Math.ceil(this.users.length / this.UsersPerPage);
  }

  get paginatedUsers(): any[] {
    const startIndex = (this.currentPage - 1) * this.UsersPerPage;
    return this.users.slice(startIndex, startIndex + this.UsersPerPage);
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


}