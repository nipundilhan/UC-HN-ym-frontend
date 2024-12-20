import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-map',
  templateUrl: './game-map.component.html',
  styleUrls: ['./game-map.component.css']
})
export class GameMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  currentGame: string | null = null;

  showProgress(gameId: string) {
    this.currentGame = gameId;
  }
  
  hideProgress() {
    this.currentGame = null;
}

}


