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
   * @name getProjectDetailsByUserId
   * @description Used to filter the details of projects of logged in user
   */
  private getProjectDetailsByUserId() {
    this._projectServices.getAllProjects().subscribe(projects => {
      this.projectDetails = projects.filter((res: any) => this.projectIds.includes(res.id))
      // console.log(this.projectDetails);
    })
  }

  /**
   * @name currentProjectId
   * @description Used to get the project id
   * @param id - id of project on which user has clicked 
   */
  public currentProjectId(id: number) {
    this._projectServices.getCurrentProjectId(id);
  }

  /**
   * @name addProjectDetails
   * @description - Used to add new project details, which are submitted bu form
   * @param newProjectDetails - project details, which are to be added
   */
  public addProjectDetails(newProjectDetails: ProjectDetails) {
    this._projectServices.addProject(newProjectDetails).subscribe(res => alert("Project is Added"))
  }
}
