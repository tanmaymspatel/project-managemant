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

  constructor(
    private _overlay: Overlay,
  ) {
    this._formData = new Subject();
    this.formData$ = new Observable();
    this.formData$ = this._formData.asObservable()
  }

  public overlayForm() {
    const OverlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().right(),
    });

    const component = new ComponentPortal(ProjectFormPresentationComponent);
    const componentRef = OverlayRef.attach(component);

    // new form data to the presentation
    componentRef.instance.addProjectDetails.subscribe(
      data => {
        this._formData.next(data);
        OverlayRef.detach();
      })

  }
}
