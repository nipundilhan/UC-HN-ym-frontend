import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peers',
  templateUrl: './peers.component.html',
  styleUrls: ['./peers.component.css']
})
export class PeersComponent implements OnInit {

  constructor() { }

  peers = [
    { username: 'Alice', avatarUrl: 'assets/avatar-img/ava01.png', points: 120 },
    { username: 'Bob', avatarUrl: 'assets/avatar-img/ava02.png', points: 95 },
    { username: 'Charlie', avatarUrl: 'assets/avatar-img/ava03.png', points: 75 },
    { username: 'Diana', avatarUrl: 'assets/avatar-img/ava04.png', points: 150 },
    { username: 'Eve', avatarUrl: 'assets/avatar-img/ava05.png', points: 110 },
  ];

  ngOnInit(): void {
    this.fetchPeers(); // Fetch peers from your API
  }

  fetchPeers(): void {
    // Replace with your API call logic
    // this.peers = result from your API;
  }
}
