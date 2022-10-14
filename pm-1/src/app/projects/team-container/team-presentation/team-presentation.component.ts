import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-team-presentation',
  templateUrl: './team-presentation.component.html',
})
export class TeamPresentationComponent implements OnInit {

  public tempTeamDetails!: any[];
  public searchText!: string

  private _teamDetails !: any;
  public get teamDetails(): any {
    return this._teamDetails;
  }
  @Input() public set teamDetails(details: any) {
    if (details)
      this._teamDetails = details;
  }


  constructor(
    private _utility: UtilityService
  ) {

  }


  ngOnInit(): void {

  }

}
