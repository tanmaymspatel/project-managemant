import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {

  constructor(private _service:AuthService) { }

  ngOnInit(): void {
    this._service.user$.subscribe((user)=>{
      console.log(user);
    })
  }
  
}
