import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { DomSanitizer } from '@angular/platform-browser';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { AngularEditorConfig } from '@kolkov/angular-editor';

export interface Message {
  message: string; // the raw message content
  sanitizedMessage?: any; // sanitized HTML message (to be set later)
  status: string; // example: 'IMPORTANT' or other status
  date: string; // example: message date
  title: string;
}


@Component({
  selector: 'app-admin-msgs',
  templateUrl: './admin-msgs.component.html',
  styleUrls: ['./admin-msgs.component.css']
})
export class AdminMsgsComponent implements OnInit {
  messages: any[] = [];
  newMessage: { title: string, message: string, status: string } = { title: '', message: '', status: 'active' };
  editingMessage: any = null;
  originalMessage: any = null;
  isPopupOpen: boolean = false;
  isEditPopupOpen: boolean = false;
  submitted: boolean = false;

  currentPage: number = 1; // Current page number
  MsgsPerPage: number = 4; // Number of questions to display per page

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '100px',
    placeholder: 'Enter your message here...',
    translate: 'no',
    toolbarHiddenButtons: [
      ['bold', 'italic', 'underline'],
      ['strikeThrough', 'subscript', 'superscript'],
      ['fontSize', 'backgroundColor', 'customClasses']
    ]
  };

  constructor(private apiCallService: ApiCallService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.apiCallService.executeGetNoAuth(API_ENDPOINTS.NOTIFICATIONS.MESSAGES).subscribe(
      (response: any[]) => {
        this.messages = response;
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }



  openCreateMessagePopup(): void {
    this.isPopupOpen = true;
    this.newMessage = { title: '', message: '', status: '' }; // Reset the form for new message
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  closeEditPopup(): void {
    this.isEditPopupOpen = false;
  }


  createMessage(): void {
    const newMsg = { ...this.newMessage, date: new Date().toISOString() }; 
    this.apiCallService.executePostNoAuth(API_ENDPOINTS.NOTIFICATIONS.MESSAGES, newMsg).subscribe(
      (response) => {
        // this.messages.push(response); // Add to messages

        this.newMessage = { title: '', message: '', status: 'active' }; // Reset form
        this.closePopup(); // Close the popup
        this.loadMessages();
      },
      (error) => {
        console.error('Error creating message:', error);
      }
    );
  }

  editMessage(msg: any): void {
    this.editingMessage = { ...msg }; // Clone the message for editing
    this.originalMessage = { ...msg }; // Store the original
    this.isEditPopupOpen = true; // Open the popup for editing
  }

  saveEditedMessage(): void {
    if (this.editingMessage) {
      console.log(this.editingMessage.message);
          this.apiCallService.executePostNoAuth(API_ENDPOINTS.NOTIFICATIONS.MESSAGES, this.editingMessage).subscribe(
      
        (response) => {
          // const index = this.messages.findIndex(msg => msg.id === this.editingMessage.id);
          // this.messages = response; // Update the message

          this.loadMessages();
          this.editingMessage = null; // Clear editing state
          this.isEditPopupOpen = false; // Close popup
        },
        (error) => {
          console.error('Error saving message:', error);
        }
      );
    }
  }

  get totalPages(): number {
    // console.log(this.QnA.length);
    return Math.ceil(this.messages.length / this.MsgsPerPage);
  }

  get paginatedMessages(): any[] {
    const startIndex = (this.currentPage - 1) * this.MsgsPerPage;
    return this.messages.slice(startIndex, startIndex + this.MsgsPerPage);
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
