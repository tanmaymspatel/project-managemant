import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() public addProjectDetails: EventEmitter<ProjectDetails>
  public projectForm: FormGroup;
  public submitted: boolean;

  constructor(
    private _projectFormPresenterService: ProjectFormPresenterService
  ) {
    this.projectForm = this._projectFormPresenterService.buildProjectForm();
    this.submitted = false;
    this.addProjectDetails = new EventEmitter();
  }

  ngOnInit(): void {
    this.emitData();
  }


  public onSubmit() {
    this.submitted = true;
    this._projectFormPresenterService.onSubmit(this.projectForm);
  }

  private emitData() {
    this._projectFormPresenterService.formData$.subscribe(data => {
      this.addProjectDetails.emit(data);
    })
  }
}
