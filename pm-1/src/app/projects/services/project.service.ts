import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { environment } from 'src/environments/environment';
import { ProjectDetails, TaskDetails } from '../models/project-details.model';

@Injectable()
export class ProjectService {
  // id of project on which user has clicked
  public currentProjectId$: Observable<number>

  //  edit data id
  private _editId: Subject<number>;
  public editId: Observable<number>


  // api link for getting data
  private _api: string;
  private _currentProjectId: Subject<number>

  constructor(
    private _http: HttpClient,
  ) {
    this._api = environment.baseURL;
    this._currentProjectId = new Subject();
    this.currentProjectId$ = new Observable();
    this.currentProjectId$ = this._currentProjectId.asObservable();

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
    this._currentProjectId.next(id);
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



  public editProject(editData: ProjectDetails): Observable<ProjectDetails> {
    return this._http.put<ProjectDetails>(`${this._api}/projects/${editData.id}`, editData);
  }

  // -------------------------------- task --------------------------------------- //
  public getStatus(): Observable<any> {
    return this._http.get<any>(`${this._api}/status`)
  }
  public getPriority(): Observable<any> {
    return this._http.get<any>(`${this._api}/priority`)
  }

  public getTaskDetails(id: number): Observable<any> {
    return this._http.get<ProjectDetails>(`${this._api}/projects/${id}`).pipe(
      map((res: ProjectDetails) => {
        let arr: TaskDetails[] = [];
        arr = arr.concat(res.activeTaskList as TaskDetails[], res.completedTaskList as TaskDetails[], res.todoList as TaskDetails[])
        return arr
      })
    )
  }



  //---------------------------------------- Teams --------------------------------------------------------------------------------------------------------------

  public getTeamDeatailById(teamId: number): Observable<any> {
    return this._http.get<any>(`${this._api}/teams/${teamId}`)
  }

  public getTeamId(projectId: number): Observable<any> {
    return this._http.get<ProjectDetails>(`${this._api}/projects/${projectId}`).pipe(
      map((res: ProjectDetails) => res?.teamId)
    )
  }

  public getTeamMembersById(teamId: number): Observable<any> {
    return this._http.get<any>(`${this._api}/teams/${teamId}`).pipe(
      map((res: any) => res?.members.map((res: any) => res.teamMembers).flat())
    )
  }
}



