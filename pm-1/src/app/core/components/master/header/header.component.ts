import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/userDetails.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  // get detalis of logged in user from the master component
  @Input() public user!: UserDetails;
  // Title of the page 
  public pageTitle!: string;

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,

  ) {
    this.getpageTitle();
  }


  ngOnInit(): void {
    this.getpageTitle();
  }

  public getpageTitle() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._activatedRouter),
      map((route: any) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap((route) => route.data)
    ).subscribe((event: any) => {
      this.pageTitle = event.title
      console.log(this.pageTitle)
    })
  }


}
