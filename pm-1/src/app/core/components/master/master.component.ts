import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../../models/userDetails.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  public currentUser!: UserDetails
  user: any

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user')
    this.currentUser = JSON.parse(this.user)
  }
  // tanmay.patel@1rivet.com
  // Admin@123
}


