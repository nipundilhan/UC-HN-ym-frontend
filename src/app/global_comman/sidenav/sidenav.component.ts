import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  public getLanguage(){
    return this.userAuthService.getLanguage();
  }

}
