import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { ProjectPresenterService } from '../project-presenter/project-presenter.service';

@Component({
  selector: 'app-project-presentation',
  templateUrl: './project-presentation.component.html',
  viewProviders: [ProjectPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPresentationComponent {

  // setter for all the projects of the user worked on
  @Input() public set projectDetails(projectDetails: any) {
    if (projectDetails) {
      this._projectDetails = projectDetails;
    }
  }

  // id of the project on which the user has clicked
  @Output() public currentProjectId: EventEmitter<number> = new EventEmitter();

  // getter of all the projects of the user worked on
  public get projectDetails(): any {
    return this._projectDetails;
  }

  // all the projects of the user worked on
  private _projectDetails !: any;

  constructor
    (
      private _router: Router
    ) { }

  /**
   * @name onProjectClick
   * @description - Used to emit id on which the user has clicked, and navigate to the project details of the clicked id
   * @param id - project id on which the user has clicked
   */
  public onProjectClick(id: number) {
    this.currentProjectId.emit(id)
    this._router.navigateByUrl(`/projects/${id}/dashboard`)
  }

}
