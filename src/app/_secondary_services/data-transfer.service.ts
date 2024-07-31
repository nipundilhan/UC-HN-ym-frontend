import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  constructor() { }


  // mention the service in providers array app.module.ts
  // providers: [DataTransferService]
  
  private dataSubject = new BehaviorSubject<any>(null); // Replace 'any' with your specific data type
  data$ = this.dataSubject.asObservable();

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
