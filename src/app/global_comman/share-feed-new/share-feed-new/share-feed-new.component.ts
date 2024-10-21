import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-feed-new',
  templateUrl: './share-feed-new.component.html',
  styleUrls: ['./share-feed-new.component.css']
})
export class ShareFeedNewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedTab: string = 'notifications'; // Default tab

  // Method to switch between tabs
  switchTab(tab: string): void {
    this.selectedTab = tab;
  }


}
