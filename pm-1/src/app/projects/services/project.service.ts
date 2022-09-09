import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {

  private _api: string;
  private currentProjectId: Subject<string>
  public currentProjectId$: Observable<string>

  constructor(
    private _http: HttpClient,
  ) {
    this._api = environment.baseURL;
    this.currentProjectId = new Subject();
    this.currentProjectId$ = new Observable();
    this.currentProjectId$ = this.currentProjectId.asObservable();
  }

  // get project data from the id
  public getProjectById(id: string): Observable<UserDetails> {
    return this._http.get<UserDetails>(`${this._api}/projects/${id}`);
  }

  public getCurrentProjectId(id: string) {
    this.currentProjectId.next(id);
  }
}
