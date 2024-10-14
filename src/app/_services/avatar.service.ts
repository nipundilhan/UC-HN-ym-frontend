import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

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

  constructor(private userAuthService: UserAuthService) { }

  getAvatarPath(): string {
    const user = this.userAuthService.getUser();

    if (user) {
      const parsedUser = JSON.parse(user); // Convert back to an object
      const avatarCode = parsedUser.avatarCode;

      // Find the avatar path based on the avatarCode
      const selectedAvatar = this.avatars.find(avatar => avatar.code === avatarCode);

      return selectedAvatar ? selectedAvatar.path : 'assets/avatar-img/default-avatar.png'; // Fallback image path
    }
    return 'assets/default-avatar.png'; // Fallback image if no user is logged in
  }
}
