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
    { id: 1, name: 'Tutorial and Labs Quest', playRoute: '/view-tutorials', learnRoute: '/learn-tutorials' },
    { id: 2, name: 'Mind Mapping Mastery', playRoute: '/play-mindmaps', learnRoute: '/learn-mindmaps' },
    { id: 3, name: 'Question Mastery', playRoute: '/play-questions', learnRoute: '/learn-game3' }
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
