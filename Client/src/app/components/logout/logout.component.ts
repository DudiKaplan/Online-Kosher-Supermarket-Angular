import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { User } from 'src/app/models/user.model';
import { IAction } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public user: User;

  constructor(private redux: NgRedux<AppState>,
    private router: Router) { }

  ngOnInit() {
    this.redux.subscribe(() => { this.user = this.redux.getState().user });
  };

  public logout(): void {
    const action: IAction = {
      type: ActionType.LogoutUser,
      payload: {}
    };
    this.redux.dispatch(action);
  };

  public goToShop(): void {
    this.router.navigate(["/shop"])
    const action: IAction = {
      type: ActionType.StartShopping,
      payload: {}
    };
    this.redux.dispatch(action);
  };

};
