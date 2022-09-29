import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
})
export class TeamContainerComponent implements OnInit {

  public projectId: number;
  public teamId!: number;

  constructor(private _projectService: ProjectService, private _activatedRoute: ActivatedRoute) {
    this.projectId = this._activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getTeamMember();
  }
  getTeamMember() {
    this._projectService.getTeamId(this.projectId).subscribe({
      next: (id) => this.teamId = id,
      error: (e) => console.log(e),
      complete: () => {
        this._projectService.getTeamMembersById(this.teamId).subscribe(res => console.log(res)
        )
      }

    })
  }
}
