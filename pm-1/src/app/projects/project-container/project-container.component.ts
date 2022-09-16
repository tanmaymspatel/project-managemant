import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { ProjectDetails } from '../models/project-details.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
})
export class ProjectContainerComponent implements OnInit {

  // logged in user
  public user: any;
  // project ids of the logged in user is associated with
  public projectIds: number[] = [];
  // all the project deails of the logged in user
  public projectDetails: ProjectDetails[];
  // copy of logged in user
  public newUser!: UserDetails;

  // id of edited project
  private _editId !: number;

  constructor
    (
      private _projectServices: ProjectService
    ) {
    this.projectDetails = [];

  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.projectIds = JSON.parse(this.user).projectId;
    this.getProjectDetailsByUserId();
  }



  /**
   * @name currentProjectId
   * @description Used to get the project id
   * @param id  id of project on which user has clicked 
   */
  public currentProjectId(id: number) {
    this._projectServices.getCurrentProjectId(id);
  }

  /**
   * @name addProjectDetails
   * @description  1 - Adds new project details which are submitted through form
   * @description  2 - Adds newly added project to the project list of the logged in user
   * @param newProjectDetails - project details, which are to be added
   */
  public addProjectDetails(newProjectDetails: ProjectDetails) {
    this._projectServices.addProject(newProjectDetails).subscribe((res: any) => {
      this.projectIds.push(res.id);
      // this.modifyLoggedInUser(this.projectIds);
      this.getProjectDetailsByUserId();
    })
  }

  /**
   * @name deleteProject
   * @description  deletes a project by particular id
   * @param id  of which project is to be deleted
   */
  /*public deleteProject(id: number) {
    if (id) {
      this.projectIds = this.projectIds.filter(projId => projId !== id)
      this.modifyLoggedInUser(this.projectIds);
    }

    this._projectServices.deleteProject(id).subscribe((res: any) => {
      this.projectIds.splice((this.projectIds.indexOf(id)), 1);
      const index = this.projectIds.indexOf(id);
      if (index > -1) { // only splice array when item is found
        this.projectIds.splice(index, 1); // 2nd parameter means remove one item only
      }

      this.getProjectDetailsByUserId();


    }
    )
  }*/

  public editProjectDetails(editData: ProjectDetails) {
    this._projectServices.editProject(editData).subscribe(res => {
      this.getProjectDetailsByUserId();
      alert("data edited");
    });
  }

  /**
  * @name getProjectDetailsByUserId
  * @description Used to filter the details of projects of logged in user
  */
  private getProjectDetailsByUserId() {
    this._projectServices.getAllProjects().subscribe(projects => {
      this.projectDetails = projects.filter((res: any) => this.projectIds.includes(res.id))
    })
  }

  /**
   * @name modifyLoggedInUser
   * @description  modifies logged in user's projects according to action 
   * @param projectIds  project ids of logged in user which are added or deleted 
   */
  private modifyLoggedInUser(projectIds: number[]) {
    this.newUser = JSON.parse(this.user); // created a copy of logged in user
    this.newUser.projectId = projectIds;
    localStorage.setItem('user', JSON.stringify(this.newUser));
    // this._projectServices.editUser(this.newUser).subscribe(() => {
    // })
  }

}
