import { Injectable, ɵisObservable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ProjectDetails } from 'src/app/projects/models/project-details.model';

@Injectable()
export class ProjectFormPresenterService {

  private _formData: Subject<ProjectDetails>;
  public formData$: Observable<ProjectDetails>;

  private _editData: Subject<ProjectDetails>;
  public editData$: Observable<ProjectDetails>;

  constructor(
    private _fb: FormBuilder
  ) {
    this._formData = new Subject();
    this.formData$ = new Observable();
    this.formData$ = this._formData.asObservable()

    this._editData = new Subject();
    this.editData$ = new Observable();
    this.editData$ = this._editData.asObservable()
  }
  /**
 * @name buildProjectForm
 * @description Used for converting form in to the reactive form
 * @returns the reactive form group
 */
  public buildProjectForm() {
    return this._fb.group({
      projectName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    })
  }
  public onSubmit(projectData: FormGroup) {
    if (projectData.valid) {
      this._formData.next(projectData.value);
    }

  }

}

