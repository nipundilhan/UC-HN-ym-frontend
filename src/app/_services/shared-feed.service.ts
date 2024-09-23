import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SharedItem {
  id: string;
  userId: string;
  username: string;
  sharedDate: Date;
  type: 'badge' | 'mindmap' | 'other';
  content: string; // Badge name, mindmap file path, etc.
  imageUrl?: string; // For badges or uploaded mindmaps
  description?: string; // Additional description of the share
  title?:string; 
}

@Injectable({
  providedIn: 'root'
})
export class SharedFeedService {
  private dummyData: SharedItem[] = [
    {
      id: '1',
      userId: 'user1',
      username: 'John Doe',
      sharedDate: new Date('2024-09-18T00:00:00Z'),
      type: 'badge',
      content: 'Achievement Unlocked',
      imageUrl: 'assets/badges/badge01.png', // Ensure this path is correct for your assets
      description: 'Unlocked the "Eye of Horus" Badge',
    },
    {
      id: '2',
      userId: 'user2',
      username: 'Jane Smith',
      sharedDate: new Date('2024-09-17T00:00:00Z'),
      type: 'mindmap',
      content: 'Mindmap',
      imageUrl: 'assets/mind-map.jpg', // Ensure this path is correct for your assets
      description: 'Uploaded a mindmap for Requirements Engineering',
      title: "Requirements Engineering"
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
    },
    {
      id: '4',
      userId: 'user3',
      username: 'Anna Hathway',
      sharedDate: new Date('2024-09-17T00:00:00Z'),
      type: 'mindmap',
      content: 'Mindmap',
      imageUrl: 'assets/mind-map.jpg', // Ensure this path is correct for your assets
      description: 'Uploaded a mindmap for Java Basics',
      title: "Java Basics"
    },
    // Add more dummy items as needed
  ];

  constructor() {}

  getSharedItems(): Observable<SharedItem[]> {
    return of(this.dummyData);
  }
}
