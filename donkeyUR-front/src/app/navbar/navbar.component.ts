import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = "User";
  is_logged_in;
  constructor(private auth: AuthService, private router: Router) {
    //this.is_logged_in = auth.isLoggedIn();
    this.is_logged_in = true;
    //this.username = localStorage.getItem("user.username");
  }

  ngOnInit(): void{
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
