import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, DoCheck {

  public user!: any
  public userName!: string;
  public isProjectPage !: boolean;
  public id!: string
  public currentUrl! : string
  public urlArray !: string[]
  public currentId!: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.isProjectPage = true;
    this.currentProjectId();
  }

  ngOnInit(): void {
    this.getName();
  }

  ngDoCheck(): void {
    this.projectPageUrl();    
    this.currentProjectId();
  }

  public logOut() {
    this._authService.logOut();
  }

  public getName() {
    this.user = localStorage.getItem('user');
    if (this.user) {
      this.userName = this.user.userName
    }
  }

  private projectPageUrl() {
    if (this._router.url !== "/projects/home") {
      this.isProjectPage = false;
    }
    else
      this.isProjectPage = true
  }

  private currentProjectId(){
    this.currentUrl= (this._router.url);
    this.urlArray = (this.currentUrl.split('/'))    
    this.currentId = this.urlArray[2]
  }
}
