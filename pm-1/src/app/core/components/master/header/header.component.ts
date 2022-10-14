import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, map, mergeMap, Subject } from 'rxjs';
import { UserDetails } from 'src/app/shared/models/userDetails.model';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  // get detalis of logged in user from the master component
  @Input() public user!: UserDetails;
  // Title of the page 
  public pageTitle!: string;
  public isSearch: boolean;

  // searchText
  public searchTextUpdate: Subject<string>;


  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private __utilityService: UtilityService
  ) {
    this.getpageTitle();
    this.isSearch = false;
    this.searchTextUpdate = new Subject();
  }


  ngOnInit(): void {
    this.getpageTitle();
    // this.searchText();
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
    ).subscribe((routeData: any) => {
      this.pageTitle = routeData.title
      this.setSearch(routeData)
    })
  }

  private setSearch(routeData: any) {
    routeData && routeData.hasOwnProperty('search') ? this.isSearch = routeData['search'] : this.isSearch = false;
  }


  // private searchText() {
  //   this.searchTextUpdate.pipe(debounceTime(650)).subscribe(value => {
  //     this.__utilityService.setSearchText(value);
  //   })
  // }

  public sendSearchString(event: any) {
    if (event.target.value.length > 2)
      this.__utilityService.setSearchText(event.target.value);
  }
}
