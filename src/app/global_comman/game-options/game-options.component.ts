import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.css']
})
export class GameOptionsComponent implements OnInit {
  game: any;

  games = [
    { id: 1, name: 'Eye of Horus', playRoute: '/view-tutorials', learnRoute: '/learn-tutorials' },
    { id: 2, name: 'Sekhmats Map', playRoute: '/mind-maps', learnRoute: '/learn-mindmaps' },
    { id: 3, name: 'Sword of Anubis', playRoute: '/game3', learnRoute: '/learn-game3' }
  ];
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id')!;
    this.game = this.games.find(g => g.id === +gameId);
  }
  

  navigateToPlay() {
    this.router.navigate([this.game.playRoute]);
  }

  navigateToLearn() {
    this.router.navigate([this.game.learnRoute]);
  }

}
