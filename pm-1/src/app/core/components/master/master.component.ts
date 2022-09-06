import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../models/userDetails.model';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {

  public currentUser!: UserDetails
  user: any

  constructor() { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.currentUser = JSON.parse(this.user)
  }
  // tanmay.patel@1rivet.com
  // Admin@123
}


