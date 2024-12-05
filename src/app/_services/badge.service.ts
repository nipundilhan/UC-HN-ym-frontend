import { Injectable } from '@angular/core';

interface Badge {
  gameCode: string;
  gameName : string,
  badgeCode: string;
  badgeName : string,
  ref: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  private badgeImageMap: Badge[] = [
    { gameCode: 'game1', gameName: 'Eye of Horus: Tutorial and Labs Mastery', badgeCode: 'badge1',badgeName: 'Beginner Badge',ref: 'Game1Badge1', path: 'assets/badges/badge01_a.png' },
    { gameCode: 'game1', gameName: 'Eye of Horus: Tutorial and Labs Mastery', badgeCode: 'badge2',badgeName: 'Master Badge',ref: 'Game1Badge2', path: 'assets/badges/badge01_b.png' },

    { gameCode: 'game2', gameName: 'Ankh`s Chronicle: Mindmapping Mastery', badgeCode: 'badge1',badgeName: 'Beginner Badge',ref: 'Game2Badge1', path: 'assets/badges/badge02_a.png' },
    { gameCode: 'game2', gameName: 'Ankh`s Chronicle: Mindmapping Mastery', badgeCode: 'badge2',badgeName: 'Master Badge',ref: 'Game2Badge2', path: 'assets/badges/badge02_b.png' },
    { gameCode: 'game2', gameName: 'Ankh`s Chronicle: Mindmapping Mastery', badgeCode: 'badge3',badgeName: 'Rising Star Badge',ref: 'Game2Badge3', path: 'assets/badges/badge02_c.png' },

    { gameCode: 'game3', gameName: 'Pharaoh`s Trial: Question Mastery', badgeCode: 'badge1',badgeName: 'Beginner Badge',ref: 'Game3Badge1', path: 'assets/badges/badge03_a.png' },
    { gameCode: 'game3', gameName: 'Pharaoh`s Trial: Question Mastery', badgeCode: 'badge2',badgeName: 'Master Badge',ref: 'Game3Badge2', path: 'assets/badges/badge03_b.png' },
    { gameCode: 'game3', gameName: 'Pharaoh`s Trial: Question Mastery', badgeCode: 'badge3',badgeName: 'Rising Star Badge',ref: 'Game3Badge3', path: 'assets/badges/badge03_c.png' },

    { gameCode: 'game4', gameName: 'Whispers of the Sphinx: Breathing Mastery', badgeCode: 'badge1',badgeName: 'Beginner Badge',ref: 'Game4Badge1', path: 'assets/badges/badge04_a.png' },
    { gameCode: 'game4', gameName: 'Whispers of the Sphinx: Breathing Mastery', badgeCode: 'badge2',badgeName: 'Master Badge',ref: 'Game4Badge2', path: 'assets/badges/badge04_b.png' },

    { gameCode: 'game5', gameName: 'Calm of the Scarab: Journalling Mastery', badgeCode: 'badge1',badgeName: 'Beginner Badge',ref: 'Game5Badge1', path: 'assets/badges/badge05_a.png' },
    { gameCode: 'game5', gameName: 'Calm of the Scarab: Journalling Mastery', badgeCode: 'badge2',badgeName: 'Master Badge',ref: 'Game5Badge2', path: 'assets/badges/badge05_b.png' },
  ];

  constructor() { }


  getPathByRef(ref: string): string {
    const badge = this.badgeImageMap.find(badge => badge.ref === ref);
    if (badge) {
      return badge.path;
    } else {
      throw new Error(`Badge with ref "${ref}" not found.`);
    }
  }

  getByRef(ref: string): any {
    const badge = this.badgeImageMap.find(badge => badge.ref === ref);
    if (badge) {
      return badge;
    } else {
      throw new Error(`Badge with ref "${ref}" not found.`);
    }
  }
}
