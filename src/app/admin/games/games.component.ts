import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: any[] = [
    {
      id: 1,
      name: 'Eye of Horus : Tutorial and Labs Quest',
      active: true,
      badgeImage: 'assets/badges/badge01.png',
      margin: 5,
      original: {} 
    },
    {
      id: 2,
      name: 'Ankhs Chronicle : Mind Map Mastery',
      active: true,
      badgeImage: 'assets/badges/badge02.png',
      margin: 5,
      original: {} 
    },
    {
      id: 3,
      name: 'Pharaohs Trail : Question Mastery',
      active: true,
      badgeImage: 'assets/badges/badge03.png',
      margin: 10,
      original: {} 
    }
  ];

  constructor() {}

  ngOnInit(): void {    
    this.games.forEach(game => {
    // Store the original values of the game to track changes
    game.original = { ...game };
  });}

  saveGameSettings(game: any) {
     //save logic
     console.log('Game settings saved for:', game);

     // Once saved, update the original values
     game.original = { ...game };
   }
  

  hasChanges(game: any): boolean {
    return (
      game.name !== game.original.name ||
      game.active !== game.original.active ||
      game.badgeImage !== game.original.badgeImage ||
      game.margin !== game.original.margin
    );
  }

  onBadgeImageChange(event: any, game: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        game.badgeImage = e.target.result; // Preview image before saving
      };
      reader.readAsDataURL(file);
    }
  }
}
