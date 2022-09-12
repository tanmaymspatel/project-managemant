import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { ProjectService } from '../../services/project.service';
import { TaskPresenterService } from '../task-presenter/task-presenter.service';

@Component({
  selector: 'app-task-presentation',
  templateUrl: './task-presentation.component.html',
  viewProviders: [TaskPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskPresentationComponent implements OnInit {

  public currentId !: string;
  public currentDetails !: any;
  private _projectDetails!: UserDetails;
  public get projectDetails(): UserDetails {
    return this._projectDetails;
  }
  @Input() public set projectDetails(details: UserDetails | null) {
    if (details) {
      this._projectDetails = details;
      console.log(details, " looged ");
    }
    // this._getCurrentProjectDetails(this._projectDetails);
  }



  // public todoList: any[];
  // public activeTaskList: any[];
  // public doneTaskList: any[];
  constructor(
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute
  ) {
    // this.todoList = [
    //   {
    //     'id': 1,
    //     'name': "Task 1",
    //     'totalMiniTasks': [1, 2, 3, 4],
    //     'completedMiniTasks': [3, 4],
    //     'priority': 'low'
    //   },
    //   {
    //     'id': 2,
    //     'name': "Task 1",
    //     'totalMiniTasks': [1, 2, 3, 4],
    //     'completedMiniTasks': [3, 4],
    //     'priority': 'low'
    //   }
    // ];

    // this.activeTaskList = [
    //   {
    //     'id': 1,
    //     'name': "Task 1",
    //     'totalMiniTasks': [1, 2, 3, 4],
    //     'completedMiniTasks': [3, 4],
    //     'priority': 'medium'
    //   }
    // ];


    // this.doneTaskList = [
    //   {
    //     'id': 1,
    //     'name': "Task 1",
    //     'totalMiniTasks': [1, 2, 3, 4],
    //     'completedMiniTasks': [3, 4],
    //     'priority': 'high'
    //   }
    // ]
  }

  ngOnInit(): void {
    // this._getCurrentProjectDetails();

  }

  private _getCurrentProjectDetails(project: UserDetails) {
    this.currentId = this._activatedRoute.snapshot.params['id']
    // let currentDetails = project.find((item: any) => item.id === this.currentId)
    // console.log(currentDetails);
    // this.currentDetails = project.filter(item => item.id === this.currentId)
    // console.log(this.currentDetails, "current");
  }

}
