import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ProjectDetails } from '../../models/project-details.model';
import { ProjectFormPresentationComponent } from '../project-presentation/project-form-presentation/project-form-presentation.component';

@Injectable()
export class ProjectPresenterService {

  public formData$: Observable<ProjectDetails>
  public editData$: Observable<ProjectDetails>

  private _formData: Subject<ProjectDetails>
  private _editData: Subject<ProjectDetails>


  constructor(
    private _overlay: Overlay,
  ) {
    // add data
    this._formData = new Subject();
    this.formData$ = new Observable();
    this.formData$ = this._formData.asObservable();
    // edit data
    this._editData = new Subject();
    this.editData$ = new Observable();
    this.editData$ = this._editData.asObservable();
  }

  public overlayForm(editDetails?: ProjectDetails, editId?: number) {
    const OverlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().right(),
    });

    const component = new ComponentPortal(ProjectFormPresentationComponent);
    const componentRef = OverlayRef.attach(component);

    OverlayRef.backdropClick().subscribe(() => OverlayRef.detach())

    // data sent to form presentation to patch
    componentRef.instance.editData = editDetails as ProjectDetails;

    //on clicking on cancel button
    componentRef.instance.cancel.subscribe(() => {
      OverlayRef.detach();
    })

    // new form data from the form on submit
    componentRef.instance.addProjectDetails.subscribe((data: ProjectDetails) => {
      this._formData.next(data);
      OverlayRef.detach();
    })

    //edit data from form on submit
    componentRef.instance.editProjectDetails.subscribe((data: ProjectDetails) => {
      data.id = editId;
      this._editData.next(data);
      OverlayRef.detach();
    })
  }


}
