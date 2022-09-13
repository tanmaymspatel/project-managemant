import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { TaskPresenterService } from '../task-presenter/task-presenter.service';

@Component({
  selector: 'app-task-presentation',
  templateUrl: './task-presentation.component.html',
  viewProviders: [TaskPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPresentationComponent implements OnInit {

  // setter for project details
  @Input() public set projectDetails(details: any | null) {
    this.assignedValuesOfList(details)
  }

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


  constructor() { }

  ngOnInit(): void {

  }

  /**
   * @name assignedValuesOfList
   * @description - USed to filter data of todo, active, and completed tasks
   */
  private assignedValuesOfList(projectDetails: any) {
    if (projectDetails) {
      this._projectDetails = projectDetails;
      this.todoList = projectDetails.todoList;
      this.activeTaskList = projectDetails.activeTaskList;
      this.completedTaskList = projectDetails.completedTaskList;
      this.todoLength = this.todoList.length;
      this.activeTaskLength = this.activeTaskList.length;
      this.completedTaskLength = this.completedTaskList.length;
    }
  }
}
