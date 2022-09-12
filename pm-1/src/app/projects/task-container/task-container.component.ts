import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
})
export class TaskContainerComponent implements OnInit {

  public user: any;
  public projectIds!: number[];
  public projectDetails!: Observable<UserDetails>;
  public currentId !: number;
  public selectedProjectDetails: any
  constructor
    (
      private _projectServices: ProjectService,
      private _active: ActivatedRoute
    ) {
    // this.projectDetails = [];
    this.selectedProjectDetails = {} as UserDetails;
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.projectIds = JSON.parse(this.user).projectId;
    this.currentId = parseInt(this._active.snapshot.params['id'])
    this.getProjectDetailsById();
  }

  private getProjectDetailsById() {
    if (this.currentId > 0) {
      this.projectDetails = this._projectServices.getProjectById(this.currentId)
    }
    // let a: any = [];
    // this.projectIds.forEach((id: number) => {

    //   // this.projectDetails = a
    //   // let currentId = this._active.snapshot.params['id']
    //   // this.selectedProjectDetails = this.projectDetails.filter((item) => item.id == currentId)

    // })
    // console.log(this.projectDetails.length,
    //   "sjdgh");
    // this.projectDetails 
    // console.log(this.projectDetails, "container");
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
