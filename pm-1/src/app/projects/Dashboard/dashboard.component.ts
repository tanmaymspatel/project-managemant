import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskDetails } from '../models/project-details.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  public currentTaskDetails$: Observable<TaskDetails[]>
  public teamDetails$: Observable<any>
  private projectId !: number
  private teamId !: number
  constructor(
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute

  ) {
    this.currentTaskDetails$ = new Observable();
    this.teamDetails$ = new Observable();
  }

  ngOnInit(): void {
    this._getProjectId();
    this.getTeamId();
    this.getTaskDetails();
  }

  private getTaskDetails() {
    this.currentTaskDetails$ = this._projectService.getTaskDetails(this.projectId);
  }

  private getTeamDetails() {
    this.teamDetails$ = this._projectService.getTeamDeatailById(this.teamId)
  }

  private _getProjectId() {
    this.projectId = this._activatedRoute.snapshot.params['id'];
  }

  private getTeamId() {
    this._projectService.getTeamId(this.projectId).subscribe({
      next: (id) => {
        this.teamId = id;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getTeamDetails();
      }
    })
  }

}
