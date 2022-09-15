import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, ɵisObservable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ProjectDetails } from '../../models/project-details.model';
import { ProjectFormPresentationComponent } from '../project-presentation/project-form-presentation/project-form-presentation.component';

@Injectable()
export class ProjectPresenterService {

  private _formData: Subject<ProjectDetails>
  public formData$: Observable<ProjectDetails>
  private _editData: Subject<ProjectDetails>
  public editData$: Observable<ProjectDetails>

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

  public overlayForm(editDetails?: ProjectDetails) {
    const OverlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().right(),
    });

    const component = new ComponentPortal(ProjectFormPresentationComponent);
    const componentRef = OverlayRef.attach(component);

    OverlayRef.backdropClick().subscribe(() => OverlayRef.detach())

    componentRef.instance.editData = editDetails as ProjectDetails;

    // new form data to the presentation
    componentRef.instance.addProjectDetails.subscribe(
      data => {
        this._formData.next(data);
        OverlayRef.detach();
      })

    //edit
    componentRef.instance.editProjectDetails.subscribe(data => {
      console.log("overlay", data);
      this._editData.next(data);
      OverlayRef.detach();
    })
  }
}
