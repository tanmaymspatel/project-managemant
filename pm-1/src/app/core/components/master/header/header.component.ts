import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/core/models/userDetails.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() public user!: UserDetails;
  public pageTitle : string;

  constructor() 
  { 
    this.pageTitle = "Projects";
  }

  ngOnInit(): void {
  }

}
