import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthorized = false;

  constructor() {}

  login() {
    this.isAuthorized = true;
    alert('Login success');
  }

  logout() {
    this.isAuthorized = false;
    alert('Logged out');
  }

  validateUsername(username: string): Observable<boolean> {
    console.log('Trigger APT call ', username);
    let existedUsers = ['doanvo', 'vodoan', 'tandoan'];
    let isValid = existedUsers.every((x) => x !== username);
    return of(isValid).pipe(delay(1000));
  }
}
