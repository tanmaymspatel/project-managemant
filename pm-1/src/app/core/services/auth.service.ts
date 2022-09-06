import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/userDetails.model';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  private _apiLink: string
  constructor(
    private _http: HttpClient,
    private _router: Router 
  ) {
    this._apiLink = environment.baseURL;
  }

  public getUsers(): Observable<UserDetails[]> {
    return this._http.get<UserDetails[]>(`${this._apiLink}/users`)
  }

  public sendUserData(currentUSer : UserDetails){
    localStorage.setItem('user',JSON.stringify(currentUSer))    
  }

  public logOut(){
    localStorage.removeItem('user');
    this._router.navigateByUrl('login')
  }
}