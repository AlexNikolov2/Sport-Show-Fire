import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null | undefined = undefined;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  constructor() { }
}
