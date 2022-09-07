import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {

  private _api: string;

  constructor(
    private _http : HttpClient,
  ) 
  { 
    this._api = environment.baseURL;
  }

   // get project data from the id
   public getProjectById(id: string): Observable<UserDetails>{
    return this._http.get<UserDetails>(`${this._api}/projects/${id}`);
  }
}
