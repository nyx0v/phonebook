import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './User';
import * as moment from "moment";
import { DataService } from './data.service';

@Injectable()
export class AuthService {

    loggedIn: boolean = false;
    public isAdmin: boolean = false;

  constructor(private http: HttpClient, private dataService: DataService) { }

  

  login(email:string, password:string ) {

      return this.http.post<any>('http://localhost:1337/login', {email, password})
  }
        
  public setSession(authResult: any) {

      localStorage.setItem('token', authResult.token);
      localStorage.setItem('userid', authResult.userid);
      this.loggedIn = true;
      this.dataService.getUserData(authResult.userid).subscribe((data: any) => {
          this.isAdmin = data.isAdmin;
          localStorage.setItem('isAdmin', data.isAdmin);
      });
  }          

  logout() {
      localStorage.removeItem("token");
  }

  public isLoggedIn() {
      return localStorage.getItem("token") !== null;
  }

  public isAdminLoggedIn() {
        return localStorage.getItem("isAdmin") == "true";
    }

  isLoggedOut() {
      return !this.isLoggedIn();
  }


}