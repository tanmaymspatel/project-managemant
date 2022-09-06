import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  private currentUSer!: any
  constructor(
    private _router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.currentUSer = localStorage.getItem('user')
    if (this.currentUSer && Object.values != undefined) {
      return true;
    }
    else {
      this._router.navigateByUrl('login')
      return false;
    }
  }

  // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //   if (!this.currentUSer) {
  //     return false;
  //   }
  //   return true;
  // }

}
