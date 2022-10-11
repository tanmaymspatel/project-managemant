import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UtilityService {

  private _searchText: BehaviorSubject<string>;
  public searchText$: Observable<string>

  constructor() {
    this._searchText = new BehaviorSubject<string>('')
    this.searchText$ = new Observable<string>();
    this.searchText$ = this._searchText.asObservable();
  }

  public setSearchText(text: string): void {
    if (text === '')
      this._searchText.next('')
    else
      // if (text.trim() && (text.length > 2 || text.length === 0))
      this._searchText.next(text.trim())
  }

  public restSearchText(): void {
    this._searchText.next('');
  }

}
