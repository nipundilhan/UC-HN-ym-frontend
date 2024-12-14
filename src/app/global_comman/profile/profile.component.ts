import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarService } from 'src/app/_services/avatar.service';  // Import the AvatarService
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { BadgeService } from 'src/app/_services/badge.service';


interface Avatar {
  code: string;
  path: string;
  selected: boolean;
}

interface GameMargins {
  game1margin1: number; 
  game1margin2: number;
  game1marks: number;
  game1badge1Shared: string;
  game1badge2Shared: string;

  game2margin1: number;
  game2margin2: number;
  game2likes: number;
  game2likesMargin: number;
  game2marks: number;
  game2badge1Shared: string;
  game2badge2Shared: string;
  game2badge3Shared: string;

  game3margin1: number;
  game3margin2: number;
  game3likes: number;
  game3likesMargin: number;
  game3marks: number;
  game3badge1Shared: string;
  game3badge2Shared: string;
  game3badge3Shared: string;

  game4margin1: number;
  game4margin2: number;
  game4marks: number;
  game4badge1Shared: string;
  game4badge2Shared: string;
  
  game5margin1: number;
  game5margin2: number;
  game5marks: number;
  game5badge1Shared: string;
  game5badge2Shared: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public avatarPath: string = ''; // Variable to store the avatar image path

  constructor(
    private userAuthService: UserAuthService ,
    private router: Router, 
    private fb: FormBuilder,
    private avatarService: AvatarService,
    public apiCallService: ApiCallService,
    public badgeService: BadgeService,
  public cdr: ChangeDetectorRef) { }

    displayedMoods: any[] = [];
    userMoodHistory: any[] = [];
    showPopup = false;
    
    selectedAvatarPath: string = ''; // Default avatar
    selectedAvatarCode: string = ''; 

    userName: string = '';
    userBirthday: string = '';
    userGender: string = '';
    userEmail: string = 'john.doe@example.com';
    currentPassword: string = '';
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
    minDate: string = new Date().toISOString().split('T')[0]; // Class property to hold the min date
    examDate: string = ''; // Default exam date

    showTooltip: string = ''; // Variable to hold the tooltip message
    avatarCode: string = '';
    // selectedBadge: any = null;
    selectedBadge: {
      gameCode: string;
      gameName: string;
      badgeCode: string;
      badgeName: string;
      ref: string;
      path: string;
    } | null = null;
    showSharePopup = false; // State for the confirmation popup
    showSuccessPopup = false; // State for the success popup
    

    gamePoints: number = 0;
    gameMargins: GameMargins | null = null;

    avatars: { code: string, path: string, selected: boolean }[] = [];
    isAvatarSelectionModalVisible: boolean = false;
    // avatars: Avatar[] = [
    //   { code: 'AVTR01', path: 'assets/avatar-img/ava01.png', selected: false},
    //   { code: 'AVTR02', path: 'assets/avatar-img/ava02.png', selected: false },
    //   { code: 'AVTR03', path: 'assets/avatar-img/ava03.png', selected: false},
    //   { code: 'AVTR04', path: 'assets/avatar-img/ava04.png', selected: false },
    //   { code: 'AVTR05', path: 'assets/avatar-img/ava05.png', selected: false },
    //   { code: 'AVTR06', path: 'assets/avatar-img/ava06.png', selected: false },
    //   { code: 'AVTR07', path: 'assets/avatar-img/ava07.png', selected: false },
    //   { code: 'AVTR08', path: 'assets/avatar-img/ava08.png', selected: false }
    // ];

    ngOnInit(): void {
       // Fetch the avatar path
      this.fetchAllData();
      this.userName = this.getUserName();

      }


  // Function to fetch data from API
  fetchAllData(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.GET_BY_STUDENT_ID + this.userAuthService.getUserId()).subscribe(
      (response: any) => {
        this.userMoodHistory = response.moods;
        this.userBirthday = response.dob;
        this.userGender = response.gender;
        const isoDate = response.examDate;
        this.examDate = this.formatToDateOnly(isoDate);
        this.avatarCode = response.avatarCode;
        // this.avatarPath = this.avatarService.getAvatarPathByCode(this.avatarCode);
        // console.log(this.avatarCode);

        this.avatarPath = this.avatarService.getAvatarPathByCode(response.avatarCode);
        this.avatarService.setAvatarByCode(response.avatarCode); // Update globally

        this.selectedAvatarPath = this.avatarService.getAvatarPathByCode(response.avatarCode); // Make sure this is set first

        this.avatars = this.avatarService['avatars']
      .filter(avatar => avatar.code !== 'default')  // Exclude default avatar
      .map(avatar => ({
        ...avatar, 
        selected: avatar.path === this.selectedAvatarPath // Add selected property
        
      })
    );
        this.cdr.detectChanges();
        this.calculateDaysLeft();
      this.loadInitialMoods(); // Load initial moods after data is fetched
  
        this.gamePoints= response.totalMarks
            this.gameMargins = {
              game1margin1: response.game1Margin1,
              game1margin2: response.game1Margin2,
              game1marks: response.game1Marks,
              game1badge1Shared: response.game1Badge1Shared,
              game1badge2Shared: response.game1Badge2Shared,
  
              game2margin1: response.game2Margin2,
              game2margin2: response.game2Margin2,
              game2marks: response.game2Marks,
              game2likesMargin: response.game2LikesMargin,
              game2likes: response.game2Likes,
              game2badge1Shared: response.game2Badge1Shared,
              game2badge2Shared: response.game2Badge2Shared,
              game2badge3Shared: response.game2Badge3Shared,
  
              game3margin1: response.game3Margin1,
              game3margin2: response.game3Margin2,
              game3marks: response.game3Marks,
              game3likesMargin: response.game3LikesMargin,
              game3likes: response.game3Likes,
              game3badge1Shared: response.game3Badge1Shared,
              game3badge2Shared: response.game3Badge2Shared,
              game3badge3Shared: response.game3Badge3Shared,
  
              game4margin1: response.game2Margin2,
              game4margin2: response.game2Margin2,
              game4marks: response.game4Marks,
              game4badge1Shared: response.game4Badge1Shared,
              game4badge2Shared: response.game4Badge2Shared,
  
              game5margin1: response.game2Margin2,
              game5margin2: response.game2Margin2,
              game5marks: response.game5Marks,
              game5badge1Shared: response.game5badge1Shared,
              game5badge2Shared: response.game5badge2Shared,
            };
  
  
  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

    // initializeAvatarSelection() {
    //   this.avatars.forEach(avatar => {
    //     avatar.selected = avatar.path === this.selectedAvatarPath;
    //   });
    // }
   

    openAvatarSelectionModal() {
      // this.initializeAvatarSelection();  // Initialize avatar selection
      this.isAvatarSelectionModalVisible = true;
    }
  
  
    closeAvatarSelectionModal() {
      this.isAvatarSelectionModalVisible = false;
    }

    selectImage(avatar: { code: string, path: string, selected: boolean }) {
      this.avatars.forEach(av => av.selected = av.code === avatar.code);  // Deselect other avatars
      this.selectedAvatarPath = avatar.path;  // Update selected avatar path
      this.selectedAvatarCode = avatar.code; 
    }
  
  
    confirmAvatarSelection() {
      const requestBody = {
        _id: this.userAuthService.getUserId(),
        avatarCode: this.selectedAvatarCode, 
        gender:"dummy",
        dob:"dummy"
      };
  
      this.apiCallService.executePutNoAuth(API_ENDPOINTS.USERS.UPDATE_STUDENT, requestBody).subscribe(
        (response: any) => {

          this.closeAvatarSelectionModal();

          this.fetchAllData();
       
          this.cdr.detectChanges();
          // Handle success response
        },
        (httpError: any) => {
          console.log(httpError);
          alert("An error occurred while updating");
        }
      );
  
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


    loadInitialMoods() {
      // Load the last 7 days of mood data
      // this.displayedMoods = this.userMoodHistory.slice(-5).reverse();
      this.displayedMoods = this.userMoodHistory.slice(0, 5);
    }


    showMoreMoods() {
      this.showPopup = true;
    }
  
    closePopup() {
      this.showPopup = false;
    }

  

    getMoodIcon(mood: string): string {
      return `assets/moods/${mood}.jpg`;
    }




// Utility function to format date
formatToDateOnly(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0]; // Extracts 'yyyy-MM-dd'
}

isBadgeShared(sharedKey: keyof GameMargins): boolean {
  return this.gameMargins?.[sharedKey] === 'YES';
}

shareBadge(badgeCode: string): void {
 const badgeDetails = this.badgeService.getByRef(badgeCode);

 const requestBody = 
      {
        studentId : this.userAuthService.getUserId(),
        gameCode : badgeDetails.gameCode,
        badgeCode : badgeDetails.badgeCode,
        reference : badgeDetails.ref
      };

    this.apiCallService.executePostNoAuth(API_ENDPOINTS.MODULES.SHARE_BADGE, requestBody).subscribe(
      async (response: any) => {
        this.fetchAllData();
      },
      (httpError: any) => {
        console.log(httpError);
        alert("An error occurred while sharing the badge");
      }
    );
  // console.log(`Badge ${badgeCode} shared`);
}




hasEarnedBadge(margin: number | null | undefined, points: number | null | undefined): boolean {
  if (margin === null || margin === undefined || points === null || points === undefined) {
    return false; // Handle null or undefined values for both parameters
  }
  return points >= margin; // Perform the comparison safely
}

getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];  // Returns 'YYYY-MM-DD' format
    }

  public getUserName() {
    return this.userAuthService.getUserName();

  }

  calculateDaysLeft(): void {
    // if (!this.examDate) return; // Safety check if examDate is empty

    const examDate = new Date(this.examDate);
    const currentDate = new Date();

    // Remove time component
    examDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const timeDifference = examDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    if (daysLeft > 0) {
      this.daysLeftMessage = `${daysLeft} day(s) left until the exam.`;
    } else if (daysLeft === 0) {
      this.daysLeftMessage = 'The exam is today!';
    } else {
      this.daysLeftMessage = 'The exam has passed.';
    }
  }

  // // Handle changes to the exam date input
  // onExamDateChange(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.examDate = inputElement.value;
  //   this.calculateDaysLeft();
  // }


  // Method to enable editing of the exam date
  // enableEdit() {
  //   this.isEditable = true;
  // }



  openSharePopup(badgeRef: string): void {
    try {
      this.selectedBadge = this.badgeService.getByRef(badgeRef); // Fetch the badge details
      this.showSharePopup = true;
    } catch (error) {
      console.error(error);
      alert('Badge details could not be retrieved.');
    }
  }
  
  closeSharePopup(): void {
    this.selectedBadge = null;
    this.showSharePopup = false;
  }
  
  confirmShare(): void {
    if (this.selectedBadge) {
      // Call the shareBadge API
      this.shareBadge(this.selectedBadge.ref);
  
      // Close the confirmation popup and open the success popup
      this.showSharePopup = false;
      this.showSuccessPopup = true;
    }
  }
  
  closeSuccessPopup(): void {
    this.selectedBadge = null;
    this.showSuccessPopup = false;
  }

  goToNotifications(): void {
      this.router.navigate(['/share/notifications']); // Redirect to notifications
  }

}

