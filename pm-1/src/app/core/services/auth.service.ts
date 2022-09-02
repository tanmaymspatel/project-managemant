import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { UserDetails } from '../models/userDetails.model';


@Injectable()
export class AuthService {

  private _apiLink: string
  constructor(
    private _http: HttpClient
  ) {
    this._apiLink = environment.baseURL;
  }

  public getUsers(): Observable<UserDetails> {
    return this._http.get<UserDetails>(`${this._apiLink}/users`)
  }

}