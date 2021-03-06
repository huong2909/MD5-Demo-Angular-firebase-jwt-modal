
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
  // @ts-ignore
} from '@angular/router';
// @ts-ignore
import {Injectable} from '@angular/core';
import {UserToken} from "../model/user-token";
import {AuthenticationService} from "../service/authentication.service";

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  currentUser: UserToken = {};

  constructor(private router: Router, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(
        (next: UserToken) => {
        this.currentUser = next;
      }
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasRoleAdmin = false;
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      // @ts-ignore
      for (const role of roleList) {
        if (role.authority === 'ADMIN') {
          hasRoleAdmin = true;
          break;
        }
      }
      if (hasRoleAdmin) {
        return true;
      } else {
        this.authService.logout();
        this.router.navigate(['/', 'admin', 'dashboard'], {queryParams: {login: true}, queryParamsHandling: 'merge'});
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'admin', 'login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      let hasRoleAdmin = false;
      // @ts-ignore
      for (const role of roleList) {
        if (role.authority === 'ADMIN') {
          hasRoleAdmin = true;
          break;
        }
      }
      return hasRoleAdmin;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'admin', 'login','wallet'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
