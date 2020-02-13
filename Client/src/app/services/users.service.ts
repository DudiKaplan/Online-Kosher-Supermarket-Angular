import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Credential } from '../models/credential.model';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  public url = environment.localUrl;

  public isExsitEmail(email: string): Observable<any> {
    const obj = {email: email};
    return this.http.post<any>(this.url + "/users/exist-user", obj)
  };

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "/users/registration", user)
  };

  public login(credential: Credential): any {
     return this.http.post<any>(this.url + "/users/login", credential)
  };

}
