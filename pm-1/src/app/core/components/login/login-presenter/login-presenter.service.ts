import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class LoginPresenterService {

  // the user which is currently logged in to the web application
  public currentUser !: any;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {
  }

  /**
   * @name buildLoginForm
   * @description Used for converting form in to the reactive form
   * @returns the reactive form group
   */
  public buildLoginForm() {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  /**
   * @name onLogin
   * @description -  Used to check whether submitted user is the authentic, and if it is, then redirect to the projects of respective user
   * @param formData - the details of the submitted form for login
   * @param userList - the existing user list 
   */
  public onLogin(formData: FormGroup, userList: UserDetails[]) {
    // let name;
    this.currentUser = userList.find((item: UserDetails) => item.email === formData.value.email && item.password === formData.value.password)
    // name = this.currentUser.name
    if (!this.currentUser) {
      alert('Please type correct credentials')
    }
    if (formData.valid && this.currentUser) {
      this._router.navigateByUrl('projects');
      this.authService.sendUserData(this.currentUser)
    }
  }
}
