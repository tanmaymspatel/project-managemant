import { Component, OnInit } from '@angular/core';
import { TaskPresenterService } from '../task-presenter/task-presenter.service';

@Component({
  selector: 'app-task-presentation',
  templateUrl: './task-presentation.component.html',
  viewProviders: [TaskPresenterService]
})
export class TaskPresentationComponent implements OnInit {

  public todoList: any[];
  public activeTaskList: any[];
  public doneTaskList: any[];
  constructor() {
    this.todoList = [
      {
        'id': 1,
        'name': "Task 1",
        'totalMiniTasks': [1, 2, 3, 4],
        'completedMiniTasks': [3, 4],
        'priority': 'low'
      },
      {
        'id': 2,
        'name': "Task 1",
        'totalMiniTasks': [1, 2, 3, 4],
        'completedMiniTasks': [3, 4],
        'priority': 'low'
      }
    ];

    this.activeTaskList = [
      {
        'id': 1,
        'name': "Task 1",
        'totalMiniTasks': [1, 2, 3, 4],
        'completedMiniTasks': [3, 4],
        'priority': 'medium'
      }
    ];


    this.doneTaskList = [
      {
        'id': 1,
        'name': "Task 1",
        'totalMiniTasks': [1, 2, 3, 4],
        'completedMiniTasks': [3, 4],
        'priority': 'high'
      }
    ]
  }

  ngOnInit(): void {
  }

}
