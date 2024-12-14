import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { BehaviorSubject } from 'rxjs';

interface Avatar {
  code: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatars: Avatar[] = [
    { code: 'default', path: 'assets/avatar-img/default-avatar.png'},
    { code: 'AVTR01', path: 'assets/avatar-img/ava01.png' },
    { code: 'AVTR02', path: 'assets/avatar-img/ava02.png' },
    { code: 'AVTR03', path: 'assets/avatar-img/ava03.png' },
    { code: 'AVTR04', path: 'assets/avatar-img/ava04.png' },
    { code: 'AVTR05', path: 'assets/avatar-img/ava05.png' },
    { code: 'AVTR06', path: 'assets/avatar-img/ava06.png' },
    { code: 'AVTR07', path: 'assets/avatar-img/ava07.png' },
    { code: 'AVTR08', path: 'assets/avatar-img/ava08.png' }
  ];

  // BehaviorSubject to store the current avatar path
  private avatarPathSubject = new BehaviorSubject<string>(
    'assets/avatar-img/default-avatar.png'
  );

  constructor(private userAuthService: UserAuthService) {
    // Initialize with the user's avatar path
    const user = this.userAuthService.getUser();
    if (user) {
      const parsedUser = JSON.parse(user);
      this.setAvatarByCode(parsedUser.avatarCode);
    }
  }

  // Observable to let components listen to avatar changes
  avatarPath$ = this.avatarPathSubject.asObservable();

  getAvatarPathByCode(avatarCode: string): string {
    const selectedAvatar = this.avatars.find((avatar) => avatar.code === avatarCode);
    return selectedAvatar
      ? selectedAvatar.path
      : 'assets/avatar-img/default-avatar.png';
  }

  setAvatarByCode(avatarCode: string): void {
    const path = this.getAvatarPathByCode(avatarCode);
    this.avatarPathSubject.next(path); // Update the BehaviorSubject
  }

  getCurrentAvatarPath(): string {
    return this.avatarPathSubject.getValue();
  }
}