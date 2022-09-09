import { AfterContentInit, Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
})
export class TaskContainerComponent implements OnInit, AfterContentInit {

  public user: any;
  public projectIds!: string[];
  public projectDetails: any[];
  public currentId !: string;
  public selectedProjectDetails: UserDetails | undefined

  constructor
    (
      private _projectServices: ProjectService
    ) {
    this.projectDetails = [];
    this.selectedProjectDetails = {} as UserDetails;
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.projectIds = JSON.parse(this.user).projectId;

    this.getProjectDetailsById();
  }

  ngAfterContentInit(): void {
    // this.getCurrentId();
  }
  // ngAfterViewInit(): void {
  //   this.getCurrentId();
  // }

  private getProjectDetailsById() {
    this.projectIds.forEach((id) => {
      this._projectServices.getProjectById(id).subscribe((res) => {
        this.projectDetails.push(res);
      })
    })
    // this.getSelectedProjectDetails(this.projectDetails)
  }

  // private getCurrentId() {
  //   this._projectServices.currentProjectId$.subscribe(res => this.currentId = res)
  // }

  // private getSelectedProjectDetails(projectArray: UserDetails[]) {
  //   this.selectedProjectDetails = projectArray.find(item => item.id = this.currentId)
  //   console.log(this.selectedProjectDetails);

  // }
}
