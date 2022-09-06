import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RedirectGuard implements CanActivate {

 public user!: any

 constructor(
private _router: Router
 ){

 }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.user = localStorage.getItem('user')
      let name = JSON.parse(this.user)
      if(this.user){
        this._router.navigate(['/' + name])
        return true;
      }
      return false;
  }
  
}
