import { ThisReceiver } from '@angular/compiler';
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
  private id !: number
  constructor(
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute

  ) {
    this.currentTaskDetails$ = new Observable()
  }

  ngOnInit(): void {
    this.getTaskDetails();
  }

  public getTaskDetails() {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.currentTaskDetails$ = this._projectService.getTaskDetails(this.id);
  }

}
