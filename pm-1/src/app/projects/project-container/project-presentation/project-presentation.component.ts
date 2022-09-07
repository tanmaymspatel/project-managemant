import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectPresenterService } from '../project-presenter/project-presenter.service';

@Component({
  selector: 'app-project-presentation',
  templateUrl: './project-presentation.component.html',
  viewProviders: [ProjectPresenterService]
})
export class ProjectPresentationComponent implements OnInit {

  private _projectDetails !: any;
  public get projectDetails(): any {
    return this._projectDetails;
  }
  @Input() public set projectDetails(projectDetails: any) {
    if (projectDetails) {
      this._projectDetails = projectDetails;
    }
  }

  constructor
  (
    private _router: Router
  ) 
  { }

  ngOnInit(): void {
  }
  public onProjectClick(id: string){
    console.log(id);
    this._router.navigateByUrl(`/projects/${id}/dashboard`)
    
  }

}
