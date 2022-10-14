import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProjectDetails } from 'src/app/projects/models/project-details.model';
import { ProjectFormPresenterService } from '../project-form-presenter/project-form-presenter.service';

@Component({
  selector: 'app-project-form-presentation',
  templateUrl: './project-form-presentation.component.html',
  viewProviders: [ProjectFormPresenterService,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectFormPresentationComponent implements OnInit {

  @Output() public cancel: EventEmitter<any>;
  private _editData!: ProjectDetails;
  public get editData(): ProjectDetails {
    return this._editData;
  }
  @Input() public set editData(data: ProjectDetails) {
    if (data) {
      this._editData = data;
      this.formTitle = "Edit Project";
      this.projectForm.patchValue(data);
    }
  }

  // new project details on submit to overlay service
  @Output() public addProjectDetails: EventEmitter<ProjectDetails>
  // edited project details on submit overlay service
  @Output() public editProjectDetails: EventEmitter<ProjectDetails>
  public projectForm: FormGroup;
  public submitted: boolean;
  public formTitle = "Create Project";

  constructor(
    private _projectFormPresenterService: ProjectFormPresenterService,
  ) {
    this.projectForm = this._projectFormPresenterService.buildProjectForm();
    this.submitted = false;
    this.addProjectDetails = new EventEmitter();
    this.editProjectDetails = new EventEmitter();
    this.cancel = new EventEmitter();
  }

  ngOnInit(): void {
    this.emitData();
  }

  public onCancel() {
    this.projectForm.reset();
    this.cancel.emit();
  }

  public onSubmit() {
    this.submitted = true;
    this._projectFormPresenterService.onSubmit(this.projectForm);
  }

  private emitData() {
    this._projectFormPresenterService.formData$.subscribe(projectData =>
      this.formTitle === "Edit Project" ? this.editProjectDetails.emit(projectData) : this.addProjectDetails.emit(projectData))
  }

}
