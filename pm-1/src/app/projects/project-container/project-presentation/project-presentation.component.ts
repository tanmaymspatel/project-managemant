import { Component, OnInit } from '@angular/core';
import { ProjectPresenterService } from '../project-presenter/project-presenter.service';

@Component({
  selector: 'app-project-presentation',
  templateUrl: './project-presentation.component.html',
  viewProviders:[ProjectPresenterService]
})
export class ProjectPresentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
