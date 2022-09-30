import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-team-container',
  templateUrl: './team-container.component.html',
})
export class TeamContainerComponent implements OnInit {

  public projectId: number;
  public teamId!: number;
  public teamDetails$!: Observable<any>

  constructor(private _projectService: ProjectService, private _activatedRoute: ActivatedRoute) {
    this.projectId = this._activatedRoute.snapshot.params['id']
    this.teamDetails$ = new Observable();
    // console.log(this._activatedRoute.url.subscribe(res => console.log(res[1].path)
    // ));

  }

  ngOnInit(): void {
    this.getTeamMembers();
  }
  getTeamMembers() {
    this._projectService.getTeamId(this.projectId).subscribe({
      next: (id) => this.teamId = id,
      error: (e) => console.log(e),
      complete: () => {
        this.teamDetails$ = this._projectService.getTeamMembersById(this.teamId)
      }
    })
  }
}
