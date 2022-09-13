import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProjectService {
  // id of project on which user has clicked
  public currentProjectId$: Observable<number>

  // api link for getting data
  private _api: string;
  private currentProjectId: Subject<number>

  constructor(
    private _http: HttpClient,
  ) {
    this._api = environment.baseURL;
    this.currentProjectId = new Subject();
    this.currentProjectId$ = new Observable();
    this.currentProjectId$ = this.currentProjectId.asObservable();
  }

  /**
   * @name getProjectById
   * @description Used to get project details by id
   * @param id - id of the project
   * @returns - observable of project details of respective id
   */
  public getProjectById(id: number): Observable<UserDetails> {
    return this._http.get<UserDetails>(`${this._api}/projects/${id}`)
  }

  /**
   * @name getCurrentProjectId 
   * @description Used to get the project id on which user has clicked
   * @param id - id of the project
   */
  public getCurrentProjectId(id: number) {
    this.currentProjectId.next(id);
  }

  /**
   * @name getAllProjects
   * @description Used to get all the project data from the data base
   * @returns Array of observable of project details
   */
  public getAllProjects(): Observable<UserDetails[]> {
    return this._http.get<UserDetails[]>(`${this._api}/projects`)
  }
}

