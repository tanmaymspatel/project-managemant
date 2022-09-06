import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/core/models/userDetails.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class LoginPresenterService {

  public currentUser !: any;
  private _loggedIn : boolean;
  
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {
   this._loggedIn = false;
  }

  public buildLoginForm() {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public onLogin(formData:FormGroup, userList: UserDetails[]){
    let name;
    this.currentUser = userList.find((item: UserDetails) => item.email === formData.value.email && item.password === formData.value.password)
    name = this.currentUser.name
    if(!this.currentUser){
      alert('Please type correct credentials')
    }
    if(formData.valid && this.currentUser){
      this._router.navigateByUrl('projects');
      this.authService.sendUserData(this.currentUser)
    }
    }
  }
