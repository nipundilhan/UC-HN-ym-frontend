import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userAuthService: UserAuthService ) { }

  ngOnInit(): void {
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

}
