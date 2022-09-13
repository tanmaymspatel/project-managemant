import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/shared/models/userDetails.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  // get detalis of logged in user from the master component
  @Input() public user!: UserDetails;
  // Title of the page 
  public pageTitle: string;

  constructor() {
    this.pageTitle = "Projects";
  }


}
