import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TaskFormPresenterService {

  public newData$: Observable<any>
  private _newData: Subject<any>

  constructor(
    private _fb: FormBuilder
  ) {
    this._newData = new Subject()
    this.newData$ = new Observable()
    this.newData$ = this._newData.asObservable()
  }

  public buildForm() {
    return this._fb.group({
      taskName: [""],
      status: [""],
      priority: [""]
    })
  }

  public onSubmit(formData: FormGroup) {
    if (!formData.valid) {
      return
    } else this._newData.next(formData.value)
  }
}
