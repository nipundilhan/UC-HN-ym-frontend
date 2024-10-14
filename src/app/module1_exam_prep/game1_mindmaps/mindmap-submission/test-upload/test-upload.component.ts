import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-test-upload',
  templateUrl: './test-upload.component.html',
  styleUrls: ['./test-upload.component.css']
})
export class TestUploadComponent implements OnInit {
  mindMapForm: FormGroup;
  uploadedFiles: File[] = [];
  filePreviews: SafeUrl[] = [];
  studentId = '66f5f6609e6aa6e25feaa952'; // Hardcoded studentId

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) {
    alert("agaya hey");
    this.mindMapForm = this.fb.group({
      title: ['', Validators.required]
    });
  }


  game2Details: any;


  ngOnInit() {
    this.getGame2Details();
  }

  getGame2Details() {
    this.http.get<any>('http://localhost:3000/YM/mindMap/66f5f6609e6aa6e25feaa952').subscribe(
      data => {
        this.game2Details = data;

        /* */
              // Assuming there's at least one mindMap
      if (this.game2Details.mindMaps && this.game2Details.mindMaps.length > 0) {
        const attachments = this.game2Details.mindMaps[0].attachments;

        attachments.forEach((attachment: any) => {
          // Convert the base64 string back to a Blob and create a File object
          const byteString = atob(attachment.data);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uint8Array = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
          }
          
          const blob = new Blob([uint8Array], { type: attachment.contentType });
          const file = new File([blob], attachment.filename, { type: attachment.contentType });

          // Push the file to uploadedFiles array
          this.uploadedFiles.push(file);

          // Create a preview URL for each file and store it in the filePreviews array
          const filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
          this.filePreviews.push(filePreview);
        });
        
        // Trigger change detection after setting the files and previews
        this.cdr.detectChanges();
      }

      },
      error => {
        console.error('Error fetching game 2 details:', error);
      }
    );
  }

  getFileUrl(data: any): string {
    // Assuming data is in base64 format
    return `data:${data.contentType};base64,${data.data}`;
  }


  viewFile(file: File) {
    const fileUrl = URL.createObjectURL(file); // Create a blob URL for the file
    window.open(fileUrl, '_blank');  // Open the file in a new tab

    
  }



  onFileChange(event: any) {
    const files = event.target.files;
    const maxFileSize = 2 * 1024 * 1024; // 2 MB
    const allowedFileTypes = ['image/jpeg', 'application/pdf'];
    const maxFilesAllowed = 2; // Maximum allowed files

    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.uploadedFiles.length >= maxFilesAllowed) {
        alert(`You can only upload a maximum of ${maxFilesAllowed} files.`);
        break; // Stop processing further files
      }

      // Check file size
      if (file.size > maxFileSize) {
        alert(`File ${file.name} exceeds the maximum size of 2 MB.`);
        continue; // Skip this file
      }
  
      // Check file type
      if (!allowedFileTypes.includes(file.type)) {
        alert(`File type of ${file.name} is not allowed. Only JPG and PDF are allowed.`);
        continue; // Skip this file
      }
  
      this.uploadedFiles.push(file); // Add each valid file to the array
      const filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      this.filePreviews.push(filePreview); 

      // this.uploadedFiles.push(files[i]); // Add each file to the array
      // const filePreview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(files[i]));
      // this.filePreviews.push(filePreview); // Create a preview for each file
    }
    this.cdr.detectChanges(); // Trigger change detection
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  removeFile(file: File) {
    alert("came bro");
    const index = this.uploadedFiles.indexOf(file);
    if (index >= 0) {
      this.uploadedFiles.splice(index, 1); // Remove the file from the array
      this.filePreviews.splice(index, 1); // Remove the corresponding preview
      this.cdr.detectChanges(); // Trigger change detection manually
    }
  }

  submit() {

    alert("come to submit method");
    const formData = new FormData();
    formData.append('studentId', this.studentId);
    formData.append('title', this.mindMapForm.get('title')!.value);
    formData.append('description', this.mindMapForm.get('description')!.value);
    formData.append('date', this.mindMapForm.get('date')!.value);

    this.uploadedFiles.forEach(file => {
      formData.append('attachments', file); // Append each file to the FormData
    });

    this.http.post('http://localhost:3000/YM/mindMap', formData).subscribe(response => {
      console.log('Mind map uploaded successfully', response);
      this.mindMapForm.reset();
      this.uploadedFiles = [];
      this.filePreviews = []; // Reset previews
      this.cdr.detectChanges(); // Trigger change detection after reset
    }, error => {
      console.error('Error uploading mind map', error);
    });
  }
}