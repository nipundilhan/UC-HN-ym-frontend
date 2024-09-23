import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Avatar {
  code: string;
  path: string;
  selected: boolean;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private userAuthService: UserAuthService ,
    private router: Router, private fb: FormBuilder) { }

    // userMoodHistory: any[] = [];
    displayedMoods: any[] = [];
    showPopup = false;
    
    selectedAvatarPath: string = 'assets/avatar-img/ava01.png'; // Default avatar

    userName: string = 'John Doe';
    userBirthday: string = '2000-01-01';
    userGender: string = 'Male';
    userEmail: string = 'john.doe@example.com';
    currentPassword: string = 'test';
    newPassword: string = '';
    confirmPassword: string = '';

    // Variables to control the visibility of passwords
    isNewPasswordVisible: boolean = false;
    isConfirmPasswordVisible: boolean = false;

    isEditDetailsModalVisible: boolean = false;
    isChangePasswordModalVisible: boolean = false;
    isChangePasswordVisible: boolean = false;
    isSaveChangesEnabled: boolean = false;

    initialUserName!: string;
    initialUserBirthday!: string;
    initialUserGender!: string;

    daysLeftMessage: string = '';
    isEditable: boolean = false;
    minDate: string = ''; // Class property to hold the min date
    examDate: string = '2024-09-30'; // Default exam date

    userMoodHistory = [
      { date: "Sep 10", mood: 'happy' },
      { date: "Sep 11", mood: 'miss' },
      { date: "Sep 12", mood: 'happy' },
      { date: "Sep 13", mood: 'happy' },
      { date: "Sep 14", mood: 'happy' },
      { date: "Sep 15", mood: 'neutral' },
      { date: "Sep 16", mood: 'excited' },
      { date: "Sep 17", mood: 'miss' },
      { date: "Sep 18", mood: 'excited' },
    ];

    avatars: Avatar[] = [
      { code: 'AVTR01', path: 'assets/avatar-img/ava01.png', selected: false},
      { code: 'AVTR02', path: 'assets/avatar-img/ava02.png', selected: false },
      { code: 'AVTR03', path: 'assets/avatar-img/ava03.png', selected: false},
      { code: 'AVTR04', path: 'assets/avatar-img/ava04.png', selected: false },
      { code: 'AVTR05', path: 'assets/avatar-img/ava05.png', selected: false },
      { code: 'AVTR06', path: 'assets/avatar-img/ava06.png', selected: false },
      { code: 'AVTR07', path: 'assets/avatar-img/ava07.png', selected: false },
      { code: 'AVTR08', path: 'assets/avatar-img/ava08.png', selected: false }
    ];
    isAvatarSelectionModalVisible: boolean = false;

    initializeAvatarSelection() {
      this.avatars.forEach(avatar => {
        avatar.selected = avatar.path === this.selectedAvatarPath;
      });
    }
    
    openAvatarSelectionModal() {
      this.initializeAvatarSelection(); // Ensure the current avatar is selected
      this.isAvatarSelectionModalVisible = true;
    }
  
    closeAvatarSelectionModal() {
      this.isAvatarSelectionModalVisible = false;
    }
  
    selectImage(avatar: Avatar) {
      // Deselect other avatars
      this.avatars.forEach(av => av.selected = av.code === avatar.code);
      // Update selected avatar path
      this.selectedAvatarPath = avatar.path;
    }
  
    confirmAvatarSelection() {
      // Save the selected avatar or perform necessary actions
      // For example, update user profile with the selected avatar
      this.closeAvatarSelectionModal();
    }

// Open modal and store initial values
openEditDetailsModal() {
  this.isEditDetailsModalVisible = true;

  // Store the initial values when the modal is opened
  this.initialUserName = this.userName;
  this.initialUserBirthday = this.userBirthday;
  this.initialUserGender = this.userGender;

  this.isSaveChangesEnabled = false; // Disable Save Changes button initially
}

closeEditDetailsModal() {
  this.isEditDetailsModalVisible = false;
}

openChangePasswordModal() {
  this.isChangePasswordModalVisible = true;
}

closeChangePasswordModal() {
  // Reset new and confirm passwords to empty when closing
  this.newPassword = '';
  this.confirmPassword = '';
  this.currentPassword = 'test';
  this.isSaveChangesEnabled = false;
  this.isChangePasswordModalVisible = false;
}

// Toggle password visibility
togglePasswordVisibility(field: string) {
  if (field === 'new') {
    this.isNewPasswordVisible = !this.isNewPasswordVisible;
  } else if (field === 'confirm') {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
}
// Detect field changes and enable Save Changes button only if a change is made
onFieldChange() {
  if (
    this.userName !== this.initialUserName ||
    this.userBirthday !== this.initialUserBirthday ||
    this.userGender !== this.initialUserGender
  ) {
    this.isSaveChangesEnabled = true;
  } else {
    this.isSaveChangesEnabled = false;
  }
}

// Check if any password field has changed
onPasswordFieldChange() {
  this.isSaveChangesEnabled = 
    this.newPassword.length >= 6 && 
    this.newPassword === this.confirmPassword;
}

// Submit form for editing profile details
onSubmit() {
  if (this.isSaveChangesEnabled) {
    // Logic for submitting updated details
    this.closeEditDetailsModal();
  }
}
  

// Handle form submission
onChangePasswordSubmit() {
  if (this.newPassword.length < 6) {
    alert('Password must be at least 6 characters long');
    return;
  }

  if (this.newPassword !== this.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Process password change logic here
  alert('Password changed successfully');
  
  this.closeChangePasswordModal();
}

    // saveChanges() {
    //   // Save the changes (e.g., make an API call)
    //   this.originalUserName = this.userName;
    //   this.originalUserBirthday = this.userBirthday;
    //   this.originalUserGender = this.userGender;
    //   this.originalUserEmail = this.userEmail;
    //   this.closeModal();
    // }

    loadInitialMoods() {
      // Load the last 7 days of mood data
      this.displayedMoods = this.userMoodHistory.slice(-5);
    }


    showMoreMoods() {
      this.showPopup = true;
    }
  
    closePopup() {
      this.showPopup = false;
    }

  
    userBadges = [
      { name: 'Eye of Horus', image: 'assets/badges/badge01.png', earned: true },
      { name: 'The Phoenix', image: 'assets/badges/badge02.png', earned: false },
      { name: 'The Ankh', image: 'assets/badges/badge03.png', earned: false }
    ];

    getMoodIcon(mood: string): string {
      return `assets/moods/${mood}.jpg`;
    }

    // getMoodIcon(mood: string): string {
    //   switch (mood) {
    //     case 'happy': return 'assets/happy.jpg';
    //     case 'sad': return 'assets/sad.jpg';
    //     case 'angry': return 'assets/angry.jpg';
    //     default: return 'assets/neutral.jpg';
    //   }
    // }

  ngOnInit(): void {
    // this.loadDummyData();
    this.loadInitialMoods();
    this.calculateDaysLeft();
    this.minDate = this.getTodayDate();

    }

getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];  // Returns 'YYYY-MM-DD' format
    }

  public getUserName() {
    return this.userAuthService.getUserName();

  }
  calculateDaysLeft() {
    const examDate = new Date(this.examDate);
    const currentDate = new Date();

    const timeDifference = examDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysLeft >= 0) {
      this.daysLeftMessage = `${daysLeft} day(s) left until the exam.`;
    } else {
      this.daysLeftMessage = 'The exam has passed.';
    }
  }

  onExamDateChange(event: any) {
    this.examDate = event.target.value;
    this.calculateDaysLeft();
  }

  // Method to enable editing of the exam date
  enableEdit() {
    this.isEditable = true;
  }




}
