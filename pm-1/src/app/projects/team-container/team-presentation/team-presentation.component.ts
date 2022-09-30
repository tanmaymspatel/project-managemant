import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-presentation',
  templateUrl: './team-presentation.component.html',
})
export class TeamPresentationComponent implements OnInit {


  private _teamDetails !: any;
  public get teamDetails(): any {
    return this._teamDetails;
  }
  @Input() public set teamDetails(details: any) {
    if (details)
      this._teamDetails = details;
  }


  constructor() { }

  ngOnInit(): void {
  }

}
