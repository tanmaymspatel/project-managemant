import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../../../shared/models/userDetails.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
})
export class LoginContainerComponent implements OnInit {

  // To store the list of existing users 
  public userList$: Observable<UserDetails[]>
  constructor(
    private _authService: AuthService,
  ) {
    this.userList$ = new Observable();
  }

  ngOnInit(): void {
    this.getUSers();
  }

  /**
   * @name getUSers
   * @description This method is used to get all the existing users
   */
  private getUSers() {
    this.userList$ = this._authService.getUsers();
  }

  // public currentUser(currentUSer: UserDetails) {
  //   this._authService.sendUserData(currentUSer);
  // }
}
