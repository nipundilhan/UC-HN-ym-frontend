import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  private submitEventSubject = new BehaviorSubject<void>(void 0);
  submitEvent$ = this.submitEventSubject.asObservable();
  
  setData(data: any): void {
    this.dataSubject.next(data);
  }

  emitSubmitEvent(): void {
    this.submitEventSubject.next();
  }
}
