import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private userService: UserService) { }

  async canActivate(): Promise<boolean> {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    const user = await this.userService.getLoggedInUser();
    if (user && !user.isAdmin) {
      this.router.navigate(['home']);
      return false;
    }

    return true;
  }

}
