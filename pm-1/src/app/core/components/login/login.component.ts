import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UserDetails } from '../../models/userDetails.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private _userList!: UserDetails[];
  private _enteredDetails!: UserDetails;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this.buildLoginForm();
    this._userList = [];
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  private buildLoginForm() {
    return this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public onLogin() {
    this._enteredDetails = this.loginForm.value;
    this._userList.forEach((item:UserDetails)=>{
      if(item.email === this._enteredDetails.email && item.password === this._enteredDetails.password){
        console.log("hello");    
        this._router.navigateByUrl("projects")    
      }
    })
  }

  private getAllUsers() {
    this._authService.getUsers().subscribe((res) => {
      this._userList.push(res);
      this._userList = this._userList.flat();
  })
  }
}
