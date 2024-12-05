import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // No need to handle message changes as all messages will display at once
  }

  startJourney() {
    // Navigate to another page or start the game
    // For example, you can navigate to the main game page after the user clicks the start button
    this.router.navigate(['/home']); // Adjust route as necessary
  }
}
