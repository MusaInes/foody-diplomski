import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../pages/shared/models/foody.model';
import { AuthService } from '../pages/shared/services/auth.service';
import { UserService } from '../pages/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: any = {}

  constructor(private authService: AuthService, public userService: UserService) {
  }

  ngOnInit(): void {

  }

  async ngAfterViewInit(): Promise<void> {
    if (!this.authService.isAuthenticated()) return;
    this.user = await this.userService.getLoggedInUser()
  }

  logout() {
    this.authService.logOutUser();
  }

}
