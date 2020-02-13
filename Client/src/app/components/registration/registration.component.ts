import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { ActionType } from 'src/app/redux/action-type';
import { IAction } from 'src/app/redux/action';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user = new User();
  public passwordConfirm: string;
  public errorEmail: string;
  public errorPassword: string;
  public cities: string[];

  constructor(private usersService: UsersService,
    private router: Router,
    private redux: NgRedux<AppState>) { }

  public ngOnInit() {
    this.cities = this.redux.getState().NyCities;
  };

  public ifExsitEmail(): void {
    this.usersService
      .isExsitEmail(this.user.email)
      .subscribe(obj => {
        if (obj.isExist) {
          this.errorEmail = "The email address is already registered in the system";
          return;
        } if (this.isPasswordConfirm()) { this.addUser() }
      }, err => alert(err.message)
      )
  };

  public isPasswordConfirm(): boolean {
    if (this.passwordConfirm === this.user.password) {
      return true;
    } else {
      this.errorPassword = "Password confirmation does not match password";
      return false;
    }
  };

  public addUser(): void {
    this.usersService
      .addUser(this.user)
      .subscribe(user => {
        const action: IAction = {
          type: ActionType.LoginUser,
          payload: user
        };
        this.redux.dispatch(action);
        this.router.navigate(["/home"]);
      }, err => alert(err.message)
      );
  };

  public clearEmailError(): void {
    this.errorEmail = undefined;
  };

  public clearPasswordError(): void {
    this.errorPassword = undefined;
  };

};
