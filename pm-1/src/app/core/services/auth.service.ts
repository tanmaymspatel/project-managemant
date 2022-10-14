import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../../shared/models/userDetails.model';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

  // api link of local database
  private _apiLink: string
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this._apiLink = environment.baseURL;
  }

  /**
   * @name getUsers
   * @description Used to get all the user data from the api
   * @returns observable of user lists
   */
  public getUsers(): Observable<UserDetails[]> {
    return this._http.get<UserDetails[]>(`${this._apiLink}/users`)
  }

  /**
   * @name sendUserData 
   * @description Used to set the details of loggein user to the local storage
   * @param currentUSer - the details of loggged in user
   */
  public sendUserData(currentUSer: UserDetails) {
    localStorage.setItem('user', JSON.stringify(currentUSer))
  }

  /**
   * @name logOut
   * @description Used to log out from the web application
   */
  public logOut() {
    localStorage.removeItem('user');
    this._router.navigateByUrl('login')
  }
}