import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mindmaps',
  templateUrl: './mindmaps.component.html',
  styleUrls: ['./mindmaps.component.css']
})
export class MindmapsComponent implements OnInit {
  selectedMindMap: any;
  isMindmapModalOpen = false;

  constructor() { }

  mindmaps: any[] = [];

  ngOnInit(): void {
    this.fetchMindmaps(); // Fetch mindmaps from your API
  }

  fetchMindmaps(): void {
    // Replace with your API call logic
    // this.mindmaps = result from your API;
    this.mindmaps= [
        {
          id: '2',
          userId: 'user2',
          username: 'Jane Smith',
          sharedDate: new Date('2024-09-17T00:00:00Z'),
          imageUrl: 'assets/mind-map.jpg', // Ensure this path is correct for your assets
          description: 'Uploaded a mindmap for Requirements Engineering',
          title: "Requirements Engineering"
        },
        {
          id: '4',
          userId: 'user3',
          username: 'Anna Hathway',
          sharedDate: new Date('2024-09-17T00:00:00Z'),
          imageUrl: 'assets/mind-map.jpg', // Ensure this path is correct for your assets
          description: 'Uploaded a mindmap for Java Basics',
          title: "Java Basics"
        },
        // Add more dummy items as needed
      ];
  }

  openMindMap(mindmap: any): void {
    this.selectedMindMap = mindmap;
    this.isMindmapModalOpen = true;
  }

  closeModal() {
    this.isMindmapModalOpen = false;
    }

  likeMindMap() {
    if (this.selectedMindMap) {
      this.selectedMindMap.likes = (this.selectedMindMap.likes || 0) + 1; // Increment likes
    }
  }


  getUserAvatar(userId: string): string {
    return 'assets/avatar-img/ava01.png'; 
  }

  downloadMindMap(): void {
    if (this.selectedMindMap && this.selectedMindMap.imageUrl) {
      const link = document.createElement('a');
      link.href = this.selectedMindMap.imageUrl; // URL of the image
      link.download = `mindmap-${this.selectedMindMap.id}.png`; // Set a filename for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }


}
