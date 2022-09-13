import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from '../../../shared/models/userDetails.model';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {

  // details of currently logged in user
  public currentUser!: UserDetails
  public user: any;
  // public isProjects !: boolean


  ngOnInit(): void {
    // geeting currently logged in user
    this.user = localStorage.getItem('user');
    this.currentUser = JSON.parse(this.user)
  }

  // tanmay.patel@1rivet.com
  // Admin@123
}


