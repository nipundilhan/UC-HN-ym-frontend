import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { API_ENDPOINTS } from 'src/app/_shared/constants/api-endpoints';
import { ApiCallService } from 'src/app/_services/api-call.service';

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
    // name: '<span class="game-title">Eye of Horus</span><span class="game-subtitle">Tutorial Quest</span>',
    name: 'Eye of Horus',
    subtitle: 'Tutorial and Labs Quest',
    // hieroglyph: '𓂀',
    hieroglyphImage: 'assets/hieroglyph1.png', 
    scrollImage: 'assets/scroll.png',
    route: '/view-tutorials' 
  },
  {
    id: 2,
    name: 'Ankh’s Chronicle',
    subtitle: 'Mind Mapping Mastery',
    hieroglyphImage: 'assets/hieroglyph2.png', 
    // hieroglyph: '𓋹',
    scrollImage: 'assets/scroll.png',
    route: '/play-mindmaps' 

  },
  {
    id: 3,
    name: 'Pharaoh’s Trial',
    subtitle: 'Question Mastery',
    hieroglyphImage: 'assets/hieroglyph3.png', 
    // hieroglyph: '𓎛',
    scrollImage: 'assets/scroll.png'
  },
  {
    id: 4,
    name: 'Whispers of the Sphinx',
    subtitle: 'Breathing Mastery',
    hieroglyphImage: 'assets/hieroglyph3.png', 
    // hieroglyph: '𓎛',
    scrollImage: 'assets/scroll.png'
  },
  {
    id: 5,
    name: 'Pharaoh’s Trial',
    subtitle: 'Question Mastery',
    hieroglyphImage: 'assets/hieroglyph3.png', 
    // hieroglyph: '𓎛',
    scrollImage: 'assets/scroll.png'
  }
];



constructor(
  private router: Router,     
  private userAuthService: UserAuthService,
  public apiCallService: ApiCallService,
) { }

ngOnInit(): void {
  //  this.router.navigate(['/view-tutorials']);
  // localStorage.removeItem('lastMoodDate'); 

  const narratorContainer = document.getElementById('narrator-container') as HTMLElement;
  const submitButton = document.getElementById('submit-mood') as HTMLButtonElement;
  const laterButton = document.getElementById('later') as HTMLButtonElement;


  // Ensure dialog opens if user hasn't interacted today
  const lastAnswered = localStorage.getItem('lastMoodDate');
  const today = new Date().toLocaleDateString();

  if (lastAnswered !== today) {
    narratorContainer.addEventListener('click', () => {
      narratorContainer.classList.add('show');
    });
  }
  else {
  narratorContainer.style.display = 'none';
    }


  

  // Handle Submit button click
// Handle Submit button click
if (submitButton) {
  submitButton.addEventListener('click', () => {
    const selectedMood = document.querySelector('input[name="mood"]:checked') as HTMLInputElement;
    if (selectedMood) {
      localStorage.setItem('lastMoodDate', today);
      localStorage.setItem('mood', selectedMood.value);

      const requestBody = {
        studentId: this.userAuthService.getUserId(),
        date: this.getCurrentDate(),  // Use today's date
        mood: selectedMood.value
      };

      this.apiCallService.executePostNoAuth(API_ENDPOINTS.MOODS.BASE, requestBody).subscribe(
        (response: any) => {
          // Handle success response
        },
        (httpError: any) => {
          console.log(httpError);
          alert("An error occurred while logging the mood");
        }
      );

      // Hide the narrator container after submitting mood
      
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
      if (narratorContainer) {
        narratorContainer.style.bottom = '-230px';
        
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

getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

navigateToGame(game: any) {
  // this.router.navigate([game.route]); // Navigate to the route defined in the game object
  this.router.navigate(['/game-options', game.id]); // Navigate to the game options page, passing the game ID

}

}
