import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { environment } from 'src/environments/environment';
import { ProjectDetails } from '../models/project-details.model';

@Injectable()
export class ProjectService {
  // id of project on which user has clicked
  public currentProjectId$: Observable<number>

  //  edit data id
  private _editId: Subject<number>;
  public editId: Observable<number>


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

    this._editId = new Subject();
    this.editId = new Observable();
    this.editId = this._editId.asObservable();
  }

  /**
   * @name getProjectById
   * @description Used to get project details by id
   * @param id - id of the project
   * @returns - observable of project details of respective id
   */
  public getProjectById(id: number): Observable<ProjectDetails> {
    return this._http.get<ProjectDetails>(`${this._api}/projects/${id}`)
  }

  public addProject(formData: ProjectDetails): Observable<ProjectDetails> {
    return this._http.post<ProjectDetails>(`${this._api}/users`, formData)
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
  public getAllProjects(): Observable<ProjectDetails[]> {
    return this._http.get<ProjectDetails[]>(`${this._api}/projects`)
  }



  /**
   * @name editUser
   * @description Used to edit the details of the user
   */
  public editUser(user: UserDetails): Observable<UserDetails> {

    return this._http.put<UserDetails>(`${this._api}/users/${user.id}`, user);
  }

  // /**
  //  * @name deleteProject
  //  * @description - Used to delete the project of particular id 
  //  * @param id - of the project which is to be deleted
  //  */
  // public deleteProject(id: number) {
  //   return this._http.delete(`${this._api}/users/${id}`);
  // }


  public editProject(editData: ProjectDetails): Observable<ProjectDetails> {
    return this._http.put<ProjectDetails>(`${this._api}/projects/${editData.id}`, editData);
  }
}

