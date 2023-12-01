import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    public userService: UserService
  ) {}

  login() {
    this.authService.login();
    this.userService.user.name = 'Doan Vo';
  }

  logout() {
    this.authService.logout();
  }
}
