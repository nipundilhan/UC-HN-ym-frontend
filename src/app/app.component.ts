import { Component, HostListener } from '@angular/core';
//import { Router } from '@angular/router';
import { UserAuthService } from './_services/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'bootstrap/dist/js/bootstrap.bundle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ym';
  showHeader = true;


  isSidebarVisible: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkMobileView();
  }

  checkMobileView(): boolean {
    return window.innerWidth < 576; // Define mobile view breakpoint
  }

  isMobileView(): boolean {
    return this.checkMobileView();
  }


  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {


       this.router.navigate(['/home']);
       

   }

 ngOnInit(): void {
    // Check if the current route has 'hideHeader' in its data
    this.router.events.subscribe(() => {
      const hideHeader = this.activatedRoute.snapshot.firstChild?.data['hideHeader'];
      this.showHeader = !hideHeader; // If hideHeader is true, hide the header
    });
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
