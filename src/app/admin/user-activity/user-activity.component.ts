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
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {
  messages: any[] = [];
  newMessage: { title: string, message: string, status: string } = { title: '', message: '', status: 'active' };
  editingMessage: any = null;
  originalMessage: any = null;
  isPopupOpen: boolean = false;
  submitted: boolean = false;

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
    this.editingMessage = null; // Ensure we're not editing
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

  createMessage(): void {
    const newMsg = { ...this.newMessage, date: new Date().toISOString() }; 
    this.apiCallService.executePostNoAuth('API_ENDPOINT/messages', newMsg).subscribe(
      (response) => {
        this.messages.push(response); // Add to messages
        this.newMessage = { title: '', message: '', status: 'active' }; // Reset form
        this.closePopup(); // Close the popup
      },
      (error) => {
        console.error('Error creating message:', error);
      }
    );
  }

  editMessage(msg: any): void {
    this.editingMessage = { ...msg }; // Clone the message for editing
    this.originalMessage = { ...msg }; // Store the original
    this.isPopupOpen = true; // Open the popup for editing
  }

  saveEditedMessage(): void {
    if (this.editingMessage) {
      this.apiCallService.executePutNoAuth(`API_ENDPOINT/messages/${this.editingMessage.id}`, this.editingMessage).subscribe(
        (response) => {
          const index = this.messages.findIndex(msg => msg.id === this.editingMessage.id);
          this.messages[index] = response; // Update the message
          this.editingMessage = null; // Clear editing state
          this.isPopupOpen = false; // Close popup
        },
        (error) => {
          console.error('Error saving message:', error);
        }
      );
    }
  }


}