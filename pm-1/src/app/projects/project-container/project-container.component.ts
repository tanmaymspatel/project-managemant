import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
})
export class ProjectContainerComponent implements OnInit {

  // logged in user
  public user: any;
  // project ids of the logged in user is associated with
  public projectIds!: number[];
  // all the project deails of the logged in user
  public projectDetails: UserDetails[];

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
      this.projectDetails = projects.filter(res => this.projectIds.includes(res.id))
      console.log(this.projectDetails);
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

}
