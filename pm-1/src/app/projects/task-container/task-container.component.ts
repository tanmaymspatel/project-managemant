import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { ProjectDetails } from '../models/project-details.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
})
export class TaskContainerComponent implements OnInit {

  public statusList$: Observable<any>
  public priorityList$: Observable<any>

  // logged in user
  public user: any;
  // project ids of respective users
  public projectIds!: number[];
  // details of current project
  public projectDetails: Observable<ProjectDetails>;
  // id of current project
  public currentId !: number;
  constructor
    (
      private _projectServices: ProjectService,
      private _active: ActivatedRoute
    ) {
    this.projectDetails = new Observable();
    this.statusList$ = new Observable();
    this.priorityList$ = new Observable();
  }

  ngOnInit(): void {
    this.getProjectDetailsById();
    this.getStatusData();
    this.getPriorityData();
  }

  /**
   * @name getProjectDetailsById
   * @description - Used to get the details of a perticular project by id
   */
  private getProjectDetailsById() {
    this.user = localStorage.getItem('user');
    this.projectIds = JSON.parse(this.user).projectId;
    this.currentId = parseInt(this._active.snapshot.params['id'])
    if (this.currentId) {
      this.projectDetails = this._projectServices.getProjectById(this.currentId)
    }
  }

  private getStatusData() {
    this.statusList$ = this._projectServices.getStatus();
  }
  private getPriorityData() {
    this.priorityList$ = this._projectServices.getPriority();
  }

  public editProjectDetails(projectDetails: ProjectDetails) {
    this._projectServices.editProject(projectDetails).subscribe(() => {
    }, () => {
      console.log("Something went wrong!");
    },
      () => {
        this.getProjectDetailsById();
      })
  }
}
