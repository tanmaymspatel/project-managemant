import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
})
export class ProjectContainerComponent implements OnInit {

  public user: any;
  public projectIds!: string[];
  public projectDetails: any[];

  constructor
    (
      private _projectServices: ProjectService
    ) {
    this.projectDetails = [];
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.projectIds = JSON.parse(this.user).projectId;

    this.getProjectDetailsById();
  }

  private getProjectDetailsById() {
    this.projectIds.forEach((id) => {
      this._projectServices.getProjectById(id).subscribe((res) => {
        this.projectDetails.push(res);
      })
    })       
    console.log(this.projectDetails);
     
  }

}
