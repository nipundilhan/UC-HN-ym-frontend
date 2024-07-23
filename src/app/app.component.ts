import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './_services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ym';

  isSidebarVisible: boolean = true;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {


       this.router.navigate(['/home']);


   }



   toggleSidebar() {
    //this.userAuthService.collapse();

    if (this.isSidebarVisible === true) {   
      this.isSidebarVisible = false;
    }else{
      this.isSidebarVisible = true;
    }
   }

  public isVisibleSidebar() {
    if (this.isSidebarVisible === true) {   
        return true;
    }else{
      return false;
    }
  }



   public isLoggedIn() {
    //alert(this.userAuthService.isLoggedIn());
    return this.userAuthService.isLoggedIn();
  }
}
