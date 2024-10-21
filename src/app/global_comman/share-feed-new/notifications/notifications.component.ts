import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];

  ngOnInit(): void {
    this.fetchNotifications(); // Fetch notifications from your API
  }

  fetchNotifications(): void {
    // Replace with your API call logic
    // this.notifications = result from your API;

    this.notifications = [
      {
        id: '1',
        userId: 'user1',
        username: 'John Doe',
        sharedDate: new Date('2024-09-18T00:00:00Z'),
        content: 'Achievement Unlocked',
        imageUrl: 'assets/badges/badge01.png', // Ensure this path is correct for your assets
        description: 'Unlocked the "Eye of Horus" Badge',
      },
      {
        id: '3',
        userId: 'user3',
        username: 'Anna Hathway',
        sharedDate: new Date('2024-09-18T00:00:00Z'),
        type: 'badge',
        content: 'Achievement Unlocked',
        imageUrl: 'assets/badges/badge02.png', // Ensure this path is correct for your assets
        description: 'Unlocked the "The Phoenix" Badge',
      }
      // Add more dummy items as needed
    ];
  }


  getUserAvatar(userId: string): string {
    return 'assets/avatar-img/ava01.png'; 
  }
}
