
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectDetails } from '../../models/project-details.model';

import { ProjectPresenterService } from '../project-presenter/project-presenter.service';

@Component({
  selector: 'app-project-presentation',
  templateUrl: './project-presentation.component.html',
  viewProviders: [ProjectPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectPresentationComponent implements OnInit {


  public userId!: any;


  // setter for all the projects of the user worked on
  @Input() public set projectDetails(projectDetails: ProjectDetails[]) {
    if (projectDetails) {
      this._projectDetails = projectDetails;
    }
  }

  // id of the project on which the user has clicked
  @Output() public currentProjectId: EventEmitter<number> = new EventEmitter();
  // new project data 
  @Output() public addProjectDetails: EventEmitter<ProjectDetails> = new EventEmitter();
  // edited project data
  @Output() public editProjectDetails: EventEmitter<ProjectDetails> = new EventEmitter();
  // delete id by clicking on project delete button
  @Output() public delete: EventEmitter<number> = new EventEmitter();

  // getter of all the projects of the user worked on
  public get projectDetails(): ProjectDetails[] {
    return this._projectDetails;
  }

  // all the projects of the user worked on
  private _projectDetails !: ProjectDetails[];

  constructor
    (
      private _projectPresenterService: ProjectPresenterService
    ) { }


  ngOnInit(): void {
    this._emitData();
  }

  /**
   * @name onProjectClick
   * @description - Used to emit id on which the user has clicked, and navigate to the project details of the clicked id
   * @param projectDetails - project id on which the user has clicked
   */
  public onProjectClick(projectDetails: ProjectDetails) {
    this.currentProjectId.emit(projectDetails.id)
  }


  public onEdit(projectDetails: ProjectDetails) {
    this.userId = projectDetails.id;
    this._projectPresenterService.overlayForm(projectDetails, this.userId);
  }

  /**
   * @name openOverlayForm
   * @description - Used to create an overlay form for creating new project
   */
  public openOverlayForm() {
    this._projectPresenterService.overlayForm();
  }




  /**
   * @name _emitData
   * @description used to emit new project details, edited project details and id of edited project to the container 
   */
  private _emitData() {
    this._projectPresenterService.formData$.subscribe(res => this.addProjectDetails.emit(res));
    this._projectPresenterService.editData$.subscribe(res => {
      this.editProjectDetails.emit(res);
    });
  }
}
