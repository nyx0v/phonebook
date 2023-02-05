import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  userList:any;

  constructor() { }

  ngOnInit(): void {

  }

  getUserResultList() {

    // const url = `http://localhost:4000/users/${user.id}/publications`
    // console.log(url);
    //  return this.http.get(url, {headers: new HttpHeaders().set('authorization', localStorage.getItem('token') as string)});
     
  }
}
