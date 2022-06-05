import { Component, NgZone, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { User } from './pages/shared/models/foody.model';
import { AuthService } from './pages/shared/services/auth.service';
import { UserService } from './pages/shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public user: any = {};
  public profile: any = {};
  title = 'foody';
  faCoffee = faCoffee;

  constructor (private zone: NgZone, private router: Router, private authService: AuthService, private userService: UserService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = event.url === '/login' || event.url === '/register' ? false : true
      }
    });
  }

  async ngOnInit(): Promise<void> {

  }

  async ngAfterViewInit(): Promise<void> {

  }

}
