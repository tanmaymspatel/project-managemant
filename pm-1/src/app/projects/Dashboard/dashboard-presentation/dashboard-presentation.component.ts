import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetails } from '../../models/project-details.model';
import { DashboardPresenterService } from '../dashboard-presenter/dashboard-presenter.service';

@Component({
  selector: 'app-dashboard-presentation',
  templateUrl: './dashboard-presentation.component.html',
  viewProviders: [DashboardPresenterService]
})
export class DashboardPresentationComponent implements OnInit {

  public members!: any[];
  public currentId!: number;

  // task Details
  private _currentTaskDetails !: TaskDetails[];
  public get currentTaskDetails(): TaskDetails[] {
    return this._currentTaskDetails;
  }
  @Input() public set currentTaskDetails(taskDetails: TaskDetails[] | null) {
    if (taskDetails) {
      this.currentTaskDetailsLength = taskDetails?.length
      this._currentTaskDetails = taskDetails;
    }
  }

  // team details
  private _teamDetails !: any;
  public get teamDetails(): any {
    return this._teamDetails;
  }
  @Input() public set teamDetails(teamDetails: any) {
    if (teamDetails) {
      this._teamDetails = teamDetails;
      this.members = teamDetails.members
    }
  }


  public currentTaskDetailsLength!: number
  public completedImage = "../../../../assets/images/completed-image.jpg"
  public norecordsImage = "../../../../assets/images/no-record.png"
  constructor(
    private _activeRoute: ActivatedRoute
  ) {
    this.currentId = this._activeRoute.snapshot.params['id']
  }

  ngOnInit(): void {
  }

}
