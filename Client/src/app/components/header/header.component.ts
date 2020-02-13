import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  constructor(private redux: NgRedux<AppState>) { }

  ngOnInit() {
    this.redux.subscribe(() => { this.user = this.redux.getState().user })
  };

};
