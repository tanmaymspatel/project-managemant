import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
})
export class TaskContainerComponent implements OnInit {

  // logged in user
  public user: any;
  // project ids of respective users
  public projectIds!: number[];
  // details of current project
  public projectDetails: Observable<UserDetails>;
  // id of current project
  public currentId !: number;
  constructor
    (
      private _projectServices: ProjectService,
      private _active: ActivatedRoute
    ) {
    this.projectDetails = new Observable();
  }

  ngOnInit(): void {
    this.getProjectDetailsById();
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
}
