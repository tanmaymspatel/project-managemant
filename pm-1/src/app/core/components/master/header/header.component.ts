import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/core/models/userDetails.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() user!: UserDetails;


  // private _user !: UserDetails;
  // public get user(): UserDetails {
  //   return this._user;
  // }
  // @Input() public set user(currentUser: UserDetails) {
  //   if (currentUser) {
  //     console.log("currentUser");
  //     this._user = currentUser;
  //   }
  // }
  constructor() { }

  ngOnInit(): void {
  }

}
