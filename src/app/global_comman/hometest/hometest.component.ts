import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hometest',
  templateUrl: './hometest.component.html',
  styleUrls: ['./hometest.component.css']
})
export class HometestComponent implements OnInit {

  // Add the games array here
  games = [
    {
      name: 'Eye of Horus',
      // hieroglyph: '𓂀',
      hieroglyphImage: 'assets/hieroglyph1.png', 
      scrollImage: 'assets/scroll.png'
    },
    {
      name: 'Sekhmats Map',
      hieroglyphImage: 'assets/hieroglyph2.png', 
      // hieroglyph: '𓋹',
      scrollImage: 'assets/scroll.png'
    },
    {
      name: 'Sword of Anubis',
      hieroglyphImage: 'assets/hieroglyph3.png', 
      // hieroglyph: '𓎛',
      scrollImage: 'assets/scroll.png'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // const narratorContainer = document.getElementById('narrator-container');
    // const lastAnswered = localStorage.getItem('lastMoodDate');
    // const today = new Date().toLocaleDateString();

    // if (lastAnswered !== today) {
    //   setTimeout(() => {
    //     if (narratorContainer) {
    //       narratorContainer.classList.add('show');
    //     }
    //   }, 1000); // Delay the appearance by 1 second

    //   document.querySelectorAll('input[name="mood"]').forEach(radio => {
    //     radio.addEventListener('change', function() {
    //       localStorage.setItem('lastMoodDate', today);
    //       localStorage.setItem('mood', this.value);
    //       if (narratorContainer) {
    //         narratorContainer.classList.remove('show'); // Hide the narrator after selection
    //       }
    //     });
    //   });
    // }
  }

}
