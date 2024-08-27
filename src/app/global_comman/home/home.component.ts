import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
// Add the games array here
games = [
  {
    id: 1,
    name: 'Eye of Horus',
    // hieroglyph: '𓂀',
    hieroglyphImage: 'assets/hieroglyph1.png', 
    scrollImage: 'assets/scroll.png',
    route: '/view-tutorials' 
  },
  {
    id: 2,
    name: 'Sekhmats Map',
    hieroglyphImage: 'assets/hieroglyph2.png', 
    // hieroglyph: '𓋹',
    scrollImage: 'assets/scroll.png'
  },
  {
    id: 3,
    name: 'Sword of Anubis',
    hieroglyphImage: 'assets/hieroglyph3.png', 
    // hieroglyph: '𓎛',
    scrollImage: 'assets/scroll.png'
  }
];



constructor(private router: Router) { }

ngOnInit(): void {
  //  this.router.navigate(['/view-tutorials']);
  localStorage.removeItem('lastMoodDate'); 

  const narratorContainer = document.getElementById('narrator-container') as HTMLElement;
  const submitButton = document.getElementById('submit-mood') as HTMLButtonElement;
  const laterButton = document.getElementById('later') as HTMLButtonElement;


  // Ensure dialog opens if user hasn't interacted today
  const lastAnswered = localStorage.getItem('lastMoodDate');
  const today = new Date().toLocaleDateString();

  if (lastAnswered !== today) {
    if (narratorContainer) {
      narratorContainer.addEventListener('click', () => {
        narratorContainer.classList.add('show');
      });
    }
  }


  // Handle Submit button click
  if (submitButton) {
    submitButton.addEventListener('click', () => {
      console.log('Submit button clicked');
      const selectedMood = document.querySelector('input[name="mood"]:checked') as HTMLInputElement;
      if (selectedMood) {
        localStorage.setItem('lastMoodDate', today);
        localStorage.setItem('mood', selectedMood.value);
        if (narratorContainer) {
          narratorContainer.style.display = 'none';
          console.log(selectedMood.value);
        }
      }
    });
  }

  // Handle Later button click
  if (laterButton) {
    laterButton.addEventListener('click', () => {
      console.log('Later button clicked');
      if (narratorContainer) {
        // narratorContainer.classList.remove('show');
        narratorContainer.style.bottom = '-230px';
        
        console.log('Dialog hidden after later');
        this.router.navigate(['/test']);
      }
    });
  }

  // if (narratorContainer) {
  //   narratorContainer.addEventListener('click', () => {
  //     narratorContainer.style.bottom = '50px';
  //   });
  // }
}

navigateToGame(game: any) {
  this.router.navigate([game.route]); // Navigate to the route defined in the game object
}

}
