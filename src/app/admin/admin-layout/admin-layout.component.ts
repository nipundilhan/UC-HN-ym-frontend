import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor( 
    private userAuthService: UserAuthService ,
    private router: Router,) { }

  ngOnInit(): void {
    
      if(this.userAuthService.getRole() !== "ADMIN"){
        this.userAuthService.clear();
        this.router.navigate(['/login']);
      }


  }
  public logout() {
    // Clear user data and navigate
    this.userAuthService.clear();
    this.router.navigate(['/introduction']);
  }
}
