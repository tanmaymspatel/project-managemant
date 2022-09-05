import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../../models/userDetails.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
})
export class LoginContainerComponent implements OnInit {

  public userList$: Observable<UserDetails[]>
  constructor(
    private _authService: AuthService,
  ) {
    this.userList$ = new Observable();
  }

  ngOnInit(): void {
    this.getUSers();
  }

  private getUSers() {
    this.userList$ = this._authService.getUsers();
  }

  public currentUser(currentUSer: UserDetails) {
    this._authService.sendUserData(currentUSer);
  }
}
