import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  private totalMarksSubject = new BehaviorSubject<number>(0);
  totalMarks$ = this.totalMarksSubject.asObservable();

  // Method to update total marks
  updateTotalMarks(newTotalMarks: number): void {
    this.totalMarksSubject.next(newTotalMarks);
  }
}
