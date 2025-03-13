import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  tasks: any[] = [];

  constructor(private apiCallService: ApiCallService) { }

  ngOnInit(): void {
    this.getTaskData();
  }

  // Fetch task data from API
  getTaskData(): void {
      this.apiCallService.executeGetNoAuth(API_ENDPOINTS.MODULES.USER_ACTIVTY).subscribe(
      (response: any[]) => {
        this.tasks = response; // Populate the tasks array with data from API
      },
      (error) => {
        console.error('Error fetching task data:', error);
      }
    );
  }

  downloadExcel() {
    // Grab the table element by its ID
    const table = document.getElementById('taskTable') as HTMLTableElement;
    
    // Create a workbook object
    const wb = XLSX.utils.table_to_book(table, { sheet: "Task Data" });
    
    // Create an Excel file and download it
    XLSX.writeFile(wb, 'task_data.xlsx');
  }
}
