import { Component, Input, OnInit } from '@angular/core';
import { TaskDetails } from '../../models/project-details.model';
import { DashboardPresenterService } from '../dashboard-presenter/dashboard-presenter.service';

@Component({
  selector: 'app-dashboard-presentation',
  templateUrl: './dashboard-presentation.component.html',
  viewProviders: [DashboardPresenterService]
})
export class DashboardPresentationComponent implements OnInit {

  private _currentTaskDetails !: TaskDetails[];
  public get currentTaskDetails(): TaskDetails[] {
    return this._currentTaskDetails;
  }
  @Input() public set currentTaskDetails(taskDetails: TaskDetails[] | null) {
    if (taskDetails) {
      this._currentTaskDetails = taskDetails;
      this.currentTaskDetailsLength = this._currentTaskDetails?.length
    }
  }

  public currentTaskDetailsLength!: number
  public completedImage = "../../../../assets/images/completed-image.jpg"
  public norecordsImage = "../../../../assets/images/no-record.png"
  constructor() { }

  ngOnInit(): void {
  }

}
