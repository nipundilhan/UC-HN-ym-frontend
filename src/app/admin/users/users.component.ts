import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userType: 'students' | 'instructors' = 'students'; // Default to 'students'
  users: any[] = []; // Replace `any` with your user model
  showAddUserPopup: boolean = false;
  showEditUserPopup: boolean = false; // For edit user popup
  showDeleteConfirmationPopup: boolean = false; // For delete confirmation
  selectedUser: any = null; // Store user details for editing
  userToDelete: any = null;  // Store user to delete

  newUser: any = {
    role: '',
    username: '',
    name: '',
    dob: '',
    email: '',
    gender: '',
    password: ''
  };

  constructor() { }

  ngOnInit(): void {
    this.loadUsers(this.userType); // Load users on initialization
  }

  loadUsers(type: 'students' | 'instructors'): void {
    this.userType = type; // Update user type
    if (type === 'students') {
      this.users = this.getStudents(); // Fetch students
    } else if (type === 'instructors') {
      this.users = this.getInstructors(); // Fetch instructors
    }
  }

  getStudents(): any[] {
    return [
      { id: 1, name: "Hirasha Pooliyadda", email: "tmp80@uclive.ac.nz" },
      { id: 2, name: "Anne Hathway", email: "abc96@uclive.ac.nz" },
      { id: 3, name: "John Doe", email: "def89@uclive.ac.nz" },
    ];
  }

  getInstructors(): any[] {
    return [
      { id: 1, name: "Dr. Miguel Morales", email: "miguel.morales@canterbury.ac.nz" },
      { id: 2, name: "Dr Valerie Sotardi ", email: "valerie.sotardi@canterbury.ac.nz" },
      // { id: 3, name: "Dr. Sarah Connor", email: "sarah.connor@example.com" },
      // { id: 4, name: "Mr. John Doe", email: "john.doe@example.com" }
    ];
  }

  switchToStudents(): void {
    this.loadUsers('students'); // Load students
  }

  switchToInstructors(): void {
    this.loadUsers('instructors'); // Load instructors
  }

  openAddUserPopup(): void {
    this.showAddUserPopup = true;
  }

  closeAddUserPopup(): void {
    this.showAddUserPopup = false;
    this.clearFormFields();
  }

  addUser() {
    if (this.newUser.role === 'student') {
      // Handle student-specific submission
      console.log("Student Data:", this.newUser);
    } else if (this.newUser.role === 'instructor') {
      // Handle instructor-specific submission
      console.log("Instructor Data:", this.newUser);
    }

    // Clear form after submission
    this.clearFormFields();
    this.closeAddUserPopup();
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

}