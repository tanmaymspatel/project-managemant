import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  public user!: any
  public userName!: string; 
  constructor(
    private _authService : AuthService
  ) 
  { 

  }

  ngOnInit(): void {
    this.getName()
  }

  public logOut(){
    this._authService.logOut();
  }

 public getName(){
   this.user = localStorage.getItem('user');
  if(this.user){
    this.userName = this.user.userName
  }
 }

}
