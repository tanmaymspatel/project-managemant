import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { LoginPresenterService } from '../login-presenter/login-presenter.service';

@Component({
  selector: 'app-login-presentation',
  templateUrl: './login-presentation.component.html',
  viewProviders: [LoginPresenterService],
})
export class LoginPresentationComponent implements OnInit {

  public loginForm: FormGroup;

  @Output() public currentUser : EventEmitter<UserDetails>;

  private _userList !: UserDetails[] ;
  public get userList() : UserDetails[]  {
    return this._userList;
  }

  @Input() public set userList(userData : UserDetails[] | null) {
    if(userData){
      this._userList = userData;
    }
  }
  
  constructor(
    private _loginService: LoginPresenterService
  ) {
    this.loginForm = this._loginService.buildLoginForm();
    this.currentUser = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public onLogin() {
    this.currentUser.emit(this.loginForm.value)
    this._loginService.onLogin(this.loginForm.value, this._userList);
  }

}
