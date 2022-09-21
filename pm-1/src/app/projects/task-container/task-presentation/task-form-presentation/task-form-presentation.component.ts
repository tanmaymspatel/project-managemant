import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskDetails } from 'src/app/projects/models/project-details.model';
import { TaskFormPresenterService } from '../task-form-presenter/task-form-presenter.service';

@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  viewProviders: [TaskFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormPresentationComponent implements OnInit {

  // edit data 

  private _editData !: TaskDetails;
  public get editData(): TaskDetails {
    return this._editData;
  }
  @Input() public set editData(editData: TaskDetails) {
    if (editData) {
      this._editData = editData;
      this.taskForm.patchValue(this._editData)
      this._editData.id = editData.id;
      this.formTitle = "Edit Task"
    }
  }

  /// data from overlay service in list presenter
  private _priorityList !: any[];
  public get priorityList(): any[] {
    return this._priorityList;
  }
  @Input() public set priorityList(list: any[]) {
    if (list) {
      this._priorityList = list;
    }
  }

  /// data from overlay service in list presenter

  private _statusList!: any[];
  public get statusList(): any[] {
    return this._statusList;
  }
  public set statusList(list: any[]) {
    if (list) {
      this._statusList = list;
    }
  }


  @Output() public cancelClick: EventEmitter<number> = new EventEmitter();
  @Output() public newTaskFormData: EventEmitter<TaskDetails> = new EventEmitter();
  @Output() public editedTaskFormData: EventEmitter<TaskDetails> = new EventEmitter();


  public taskForm: FormGroup;
  public formTitle: string;

  constructor(
    private _taskFormPresenterService: TaskFormPresenterService
  ) {
    this.formTitle = "Add Task";
    this.taskForm = this._taskFormPresenterService.buildForm();
  }

  ngOnInit(): void {
    this.emitData();
  }

  public onCancel() {
    this.cancelClick.emit();
  }

  public onSubmit() {
    this._taskFormPresenterService.onSubmit(this.taskForm)
  }

  public emitData() {
    this._taskFormPresenterService.newData$.subscribe(formData =>
      this.formTitle === "Add Task" ? this.newTaskFormData.emit(formData) : this.editedTaskFormData.emit(formData)
    )
  }
}


