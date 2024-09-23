import { Component, OnInit } from '@angular/core';
import { SharedFeedService } from 'src/app/_services/shared-feed.service'; // Adjust the path if needed

export interface SharedItem {
  id: string;
  userId: string;
  username: string;
  sharedDate: Date;
  type: 'badge' | 'mindmap' | 'other';
  content: string;
  imageUrl?: string;
  description?: string;
  likes?: number; 
  title?: string;

}

@Component({
  selector: 'app-share-feed',
  templateUrl: './share-feed.component.html',
  styleUrls: ['./share-feed.component.css']
})
export class ShareFeedComponent implements OnInit {
  sharedItems: SharedItem[] = [];
  selectedTab: string = 'notifications'; // Default tab
  selectedMindMap: SharedItem | null = null; // For the mind map modal

  // Pagination variables
  itemsPerPage: number = 5;  // Default items per page
  currentPage: number = 1;   // Track current page
  paginatedItems: SharedItem[] = []; // Items for the current page


  peers = [
    { username: 'Alice', avatarUrl: 'assets/avatar-img/ava01.png', points: 120 },
    { username: 'Bob', avatarUrl: 'assets/avatar-img/ava02.png', points: 95 },
    { username: 'Charlie', avatarUrl: 'assets/avatar-img/ava03.png', points: 75 },
    { username: 'Diana', avatarUrl: 'assets/avatar-img/ava04.png', points: 150 },
    { username: 'Eve', avatarUrl: 'assets/avatar-img/ava05.png', points: 110 },
  ];

  constructor(private sharedFeedService: SharedFeedService) {}

  ngOnInit(): void {
    this.sharedFeedService.getSharedItems().subscribe((data: SharedItem[]) => {
      this.sharedItems = data;
    this.setItemsPerPage(); 
    this.updatePaginatedItems();
    });
  }

  // Helper function to remove duplicate items based on 'id' or another property.
removeDuplicateItems(items: SharedItem[]): SharedItem[] {
  return items.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );
}

  // Method to switch between tabs
  switchTab(tab: string): void {
    this.selectedTab = tab;
    this.setItemsPerPage();  // Adjust items per page based on tab
    this.currentPage = 1;    // Reset to the first page when switching tabs
    this.updatePaginatedItems(); 
  }

  // Set items per page based on the selected tab/content type
  setItemsPerPage(): void {
    switch (this.selectedTab) {
      case 'notifications':
        this.itemsPerPage = 3;
        break;
      case 'mindmaps':
        this.itemsPerPage = 4;
        break;
      case 'peers':
        this.itemsPerPage = 10;
        break;
      default:
        this.itemsPerPage = 5; // Default number of items per page
        break;
    }
  }

  getUserAvatar(userId: string): string {
    return 'assets/avatar-img/ava01.png'; 
  }

  openMindMap(item: SharedItem) {
    this.selectedMindMap = item; // Set the selected mind map for the modal
  }

  closeModal() {
    this.selectedMindMap = null; // Close the modal
  }

  likeMindMap() {
    if (this.selectedMindMap) {
      this.selectedMindMap.likes = (this.selectedMindMap.likes || 0) + 1; // Increment likes
    }
  }

  updatePaginatedItems(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
  
    if (this.selectedTab === 'notifications') {
      // Show all items when "Notifications" tab is selected
      this.paginatedItems = this.sharedItems.slice(start, end);
    } else if (this.selectedTab === 'mindmaps') {
      // Filter only mind maps for "Mindmaps" tab
      const mindmaps = this.sharedItems.filter(item => item.type === 'mindmap');
      this.paginatedItems = mindmaps.slice(start, end);
    } else if (this.selectedTab === 'peers') {
      // Handle the "Peers" or other tab if needed
      this.paginatedItems = this.sharedItems.filter(item => item.type === 'other').slice(start, end);
    }
  }
  

  // Getter method for filtered mind maps
  get filteredMindMaps(): SharedItem[] {
    return this.paginatedItems.filter(item => item.type === 'mindmap');
  }

  // Method to navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.updatePaginatedItems(); // Update the items displayed on the new page
    }
  }

   // Calculate total pages for pagination
   totalPages(): number {
    if (this.selectedTab === 'notifications') {
      // Calculate total pages based on all items
      return Math.ceil(this.sharedItems.length / this.itemsPerPage);
    } else if (this.selectedTab === 'mindmaps') {
      // Calculate total pages based on mind maps only
      const mindmapCount = this.sharedItems.filter(item => item.type === 'mindmap').length;
      return Math.ceil(mindmapCount / this.itemsPerPage);
    } else if (this.selectedTab === 'peers') {
      // Calculate total pages for peers or other items if needed
      const otherCount = this.sharedItems.filter(item => item.type === 'other').length;
      return Math.ceil(otherCount / this.itemsPerPage);
    }
  
    // Default case, returning total pages for all items
    return Math.ceil(this.sharedItems.length / this.itemsPerPage);
  }
  

  // Navigate to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

// Method for fetching paginated notifications
getPaginatedNotifications(): SharedItem[] {
  return this.sharedItems
    .filter(item => item.type === 'badge') // Assuming 'badge' is used for notifications
    .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
}

// Method for fetching paginated mind maps
getPaginatedMindMaps(): SharedItem[] {
  return this.sharedItems
    .filter(item => item.type === 'mindmap')
    .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
}

// Method for fetching paginated other items
getPaginatedOtherItems(): SharedItem[] {
  return this.sharedItems
    .filter(item => item.type === 'other')
    .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
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


