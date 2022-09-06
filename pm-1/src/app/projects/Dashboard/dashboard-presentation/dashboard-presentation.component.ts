import { Component, OnInit } from '@angular/core';
import { DashboardPresenterService } from '../dashboard-presenter/dashboard-presenter.service';

@Component({
  selector: 'app-dashboard-presentation',
  templateUrl: './dashboard-presentation.component.html',
  viewProviders:[DashboardPresenterService]
})
export class DashboardPresentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
