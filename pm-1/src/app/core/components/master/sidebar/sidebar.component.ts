import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit, DoCheck {

  // get details of logged in users from master component
  @Input() public user!: any
  // name of logged in user
  public userName!: string;
  // to check if the user is on projects page or not
  public isProjectPage !: boolean;
  // the url on which the user is currently 
  public currentUrl!: string
  public urlArray !: string[]
  public currentId!: string;

  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    this.isProjectPage = true;
  }

  ngOnInit(): void {
    this.getName();
  }

  ngDoCheck(): void {
    this.projectPageUrl();
    this.currentProjectId();
  }

  /**
   * @name logOut
   * @description Used to log out from the application
   */
  public logOut() {
    this._authService.logOut();
  }

  /**
   * @name getName
   * @description Used to get the name of user
   */
  public getName() {
    if (this.user) {
      this.userName = this.user.userName
    }
  }

  /**
   * @name projectPageUrl
   * @description Used to check condition based on the current navigation url
   */
  private projectPageUrl() {
    if (this._router.url !== "/projects/home") {
      this.isProjectPage = false;
    }
    else
      this.isProjectPage = true
  }

  /**
   * @name currentProjectId
   * @description Used to get the id of current project from the url
   */
  private currentProjectId() {
    this.currentUrl = (this._router.url);
    this.urlArray = (this.currentUrl.split('/'))
    this.currentId = this.urlArray[2]
  }
}
