import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/userDetails.model';
import { Subject } from 'rxjs/internal/Subject';


@Injectable()
export class AuthService {

  private _apiLink: string
  private _user: Subject<UserDetails>
  public user$: Observable<UserDetails>
  constructor(
    private _http: HttpClient
  ) {
    this._apiLink = environment.baseURL;
    this._user = new Subject();
    this.user$ = this._user.asObservable();
  }

  public getUsers(): Observable<UserDetails[]> {
    return this._http.get<UserDetails[]>(`${this._apiLink}/users`)
  }

  public sendUserData(currentUSer : UserDetails){
    this._user.next(currentUSer);
    localStorage.setItem('user',JSON.stringify(currentUSer))
  }
}