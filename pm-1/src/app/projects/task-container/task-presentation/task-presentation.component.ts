import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProjectDetails, TaskDetails } from '../../models/project-details.model';
import { TaskPresenterService } from '../task-presenter/task-presenter.service';

@Component({
  selector: 'app-task-presentation',
  templateUrl: './task-presentation.component.html',
  viewProviders: [TaskPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPresentationComponent implements OnInit {

  public editId !: number;

  // status

  private _statusList!: any[];
  public get statusList(): any[] {
    return this._statusList;
  }
  @Input() public set statusList(list: any[]) {
    if (list) {
      this._statusList = list;
    }
  }

  // priority

  private _priorityList!: any[];
  public get priorityList(): any[] {
    return this._priorityList;
  }
  @Input() public set priorityList(list: any[]) {
    if (list) {
      this._priorityList = list;
    }
  }

  // setter for project details
  @Input() public set projectDetails(details: ProjectDetails | null) {
    this.assignedValuesOfList(details)
  }

  @Output() public editedProjectDetails: EventEmitter<ProjectDetails> = new EventEmitter();


  // getter for project details
  public get projectDetails(): any {
    return this._projectDetails;
  }
  // list of tasks which are to be done 
  public todoList!: any[];
  // list of the tasks which are currently being done
  public activeTaskList!: any[];
  // list of tasks which are already done
  public completedTaskList!: any[];

  public todoLength!: number;
  public activeTaskLength!: number;
  public completedTaskLength!: number;

  // project deatails for a perticular id
  private _projectDetails!: any;


  constructor(
    private _taskPresenterService: TaskPresenterService
  ) { }

  ngOnInit(): void {
    this.emitEditedProjectDetails();
  }

  /**
   * @name assignedValuesOfList
   * @description - USed to filter data of todo, active, and completed tasks
   */
  private assignedValuesOfList(projectDetails: any) {
    if (projectDetails) {
      this._projectDetails = projectDetails;
      this.todoList = projectDetails?.todoList;
      this.activeTaskList = projectDetails?.activeTaskList;
      this.completedTaskList = projectDetails?.completedTaskList;
      this.todoLength = this.todoList?.length;
      this.activeTaskLength = this.activeTaskList?.length;
      this.completedTaskLength = this.completedTaskList?.length;
    }
  }

  public openTaskForm() {
    this._taskPresenterService.openTaskFormOverlay(this._projectDetails, this.editId, this._priorityList, this._statusList,);
  }
  public emitEditedProjectDetails() {
    this._taskPresenterService.newData$.subscribe((editedProjectDetails) => {
      this._projectDetails = editedProjectDetails;
      this.editedProjectDetails.emit(this._projectDetails);
    })
  }

  onEdit(editData: TaskDetails) {
    this.editId = editData.id;
    this._taskPresenterService.openTaskFormOverlay(this.editId, this._projectDetails, this._priorityList, this._statusList, editData,)
  }
  onDelete(task: TaskDetails) {
    this._taskPresenterService.onDelete(task, this._projectDetails, this.todoList, this.activeTaskList, this.completedTaskList)
  }

}
