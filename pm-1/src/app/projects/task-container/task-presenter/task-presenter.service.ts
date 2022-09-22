import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ProjectDetails, TaskDetails } from '../../models/project-details.model';
import { TaskFormPresentationComponent } from '../task-presentation/task-form-presentation/task-form-presentation.component';

@Injectable()
export class TaskPresenterService {

  public newData$: Observable<ProjectDetails>;
  private _newData: Subject<ProjectDetails>
  constructor(
    private _overlay: Overlay
  ) {
    this._newData = new Subject();
    this.newData$ = new Observable();
    this.newData$ = this._newData.asObservable();
  }

  public openTaskFormOverlay(editid: number, projectDetails: any, priorityList: any, statusList: any, editData?: TaskDetails,) {

    const OverlayRef = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().centerVertically().centerHorizontally(),
    });

    const component = new ComponentPortal(TaskFormPresentationComponent);
    const componentRef = OverlayRef.attach(component);

    OverlayRef.backdropClick().subscribe(() => OverlayRef.detach())

    //on clicking on cancel button
    componentRef.instance.cancelClick.subscribe(() => OverlayRef.detach())

    // priority and status list to the task form - craeting instances

    componentRef.instance.priorityList = priorityList;
    componentRef.instance.statusList = statusList;

    // new form data added in the respective lists according to status
    componentRef.instance.newTaskFormData.subscribe(data => {
      data.completedSubTasks = []
      data.totalSubTasks = []
      if (projectDetails) {
        if (data.status === "todo") {
          data.id = projectDetails?.todoList[projectDetails?.todoList.length - 1].id + 1;
          projectDetails?.todoList.push(data);
        } else if (data.status === "active") {
          data.id = projectDetails?.activeTaskList[projectDetails?.activeTaskList.length - 1].id + 1;
          projectDetails?.activeTaskList.push(data);
        } else if (data.status === "completed") {
          data.id = projectDetails?.completedTaskList[projectDetails?.completedTaskList.length - 1].id + 1;
          projectDetails?.completedTaskList.push(data);
        }
        this._newData.next(projectDetails);
      }
      OverlayRef.detach()
    })


    // data to the task form to be edited 
    componentRef.instance.editData = editData as TaskDetails;


    // edited data from the task form on submitting
    componentRef.instance.editedTaskFormData.subscribe(data => {
      let index;
      data.id = editid
      if (data.status == "todo") {
        index = projectDetails.todoList.findIndex((ele: any) => ele.id === editid)
        data.completedSubTasks = projectDetails.todoList[index].completedSubTasks;
        data.totalSubTasks = projectDetails.todoList[index].totalSubTasks;
        projectDetails.todoList.splice(index, 1, data);
      }
      else if (data.status == "active") {
        index = projectDetails.activeTaskList.findIndex((ele: any) => ele.id === editid)
        data.completedSubTasks = projectDetails.activeTaskList[index].completedSubTasks;
        data.totalSubTasks = projectDetails.activeTaskList[index].totalSubTasks;
        projectDetails.activeTaskList.splice(index, 1, data);
        console.log(data);
      }
      if (data.status == "completed") {
        index = projectDetails.completedTaskList.findIndex((ele: any) => ele.id === editid)
        data.completedSubTasks = projectDetails.completedTaskList[index].completedSubTasks;
        data.totalSubTasks = projectDetails.completedTaskList[index].totalSubTasks;
        projectDetails.completedTaskList.splice(index, 1, data);
        console.log(data);
      }
      this._newData.next(projectDetails);
      OverlayRef.detach();
    });

  }



  //----------------------------------------------
  public onDelete(task: TaskDetails, projectDetails: ProjectDetails, todoList: TaskDetails[], activeTaskList: TaskDetails[], completedTaskList: TaskDetails[]) {
    if (task.status === "todo") {
      projectDetails.todoList = todoList.filter(item => item.id !== task.id)
    }
    else if (task.status === "active") {
      projectDetails.activeTaskList = activeTaskList.filter(item => item.id !== task.id)
    }
    if (task.status === "completed") {
      projectDetails.completedTaskList = completedTaskList.filter(item => item.id !== task.id)
    }
    this._newData.next(projectDetails);
  }
}
