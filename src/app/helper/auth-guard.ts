// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserToken} from "../model/user-token";
import {AuthenticationService} from "../service/authentication.service";

// @ts-ignore
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  currentUser: UserToken = {};

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe(
        (currentUser: UserToken) => {
        this.currentUser = currentUser;
      }
    );
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentUser) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
