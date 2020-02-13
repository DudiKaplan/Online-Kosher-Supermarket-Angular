import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Credential } from 'src/app/models/credential.model';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { IAction } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = new Credential();
  public errorLogin: string;
  public user: User;

  constructor(private usersService: UsersService,
    private router: Router,
    private redux: NgRedux<AppState>) { }

  ngOnInit() {
    this.redux.subscribe(() => this.user = this.redux.getState().user)
  }

  public login(): void {
    this.usersService
      .login(this.credential)
      .subscribe(user => {
        if (!user.error) {
          const action: IAction = {
            type: ActionType.LoginUser,
            payload: user
          };
          this.redux.dispatch(action);
        } else {
          this.errorLogin = user.error;
        }
      })
  };

  public clearError(): void {
    this.errorLogin = undefined;
  };
};
