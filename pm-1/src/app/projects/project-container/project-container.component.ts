import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
})
export class ProjectContainerComponent implements OnInit {

  public user: any;
  public projectIds!: number[];
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

  private getProjectDetailsByUserId() {
    this._projectServices.getAllProjects().subscribe(res => {
      this.projectDetails = res.filter(res => this.projectIds.includes(res.id))
      console.log(this.projectDetails);
    })
  }

  public currentProjectId(id: string) {
    this._projectServices.getCurrentProjectId(id);
  }

}
