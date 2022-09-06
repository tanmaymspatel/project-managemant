import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  constructor(
    private _authService : AuthService
  ) 
  { 

  }

  ngOnInit(): void {
  }

  public logOut(){
    this._authService.logOut();
  }

}
