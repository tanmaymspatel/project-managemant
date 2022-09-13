import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { LoginPresenterService } from '../login-presenter/login-presenter.service';

@Component({
  selector: 'app-login-presentation',
  templateUrl: './login-presentation.component.html',
  viewProviders: [LoginPresenterService],
})
export class LoginPresentationComponent {

  // setter for the userlist getting from the login container 
  @Input() public set userList(userData: UserDetails[] | null) {
    if (userData) {
      this._userList = userData;
    }
  }
  // getter for the userlist to use in html 
  public get userList(): UserDetails[] {
    return this._userList;
  }

  // to bind the login form with the reactive forms
  public loginForm: FormGroup;
  // To know if the form is submitted or not
  public formSubmitted: boolean;

  private _userList !: UserDetails[];

  constructor(
    private _loginService: LoginPresenterService
  ) {
    this.loginForm = this._loginService.buildLoginForm();
    this.formSubmitted = false;

  }

  /**
   * @name onLogin
   * @description This method is used to pass the form data to the presenter for further manipulation
   */
  public onLogin() {
    this.formSubmitted = true
    this._loginService.onLogin(this.loginForm, this._userList);
  }

  /**
   * @name getControls
   * @description Getter for the controls of login form for easily use validations
   */
  public get getControls() {
    return this.loginForm['controls'];
  }

}
