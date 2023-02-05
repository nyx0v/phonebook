import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) {



      this.form = this.fb.group({
          email: ['',Validators.required],
          password: ['',Validators.required]
      });
  }
  ngOnInit(): void {
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  (data: any) => {
                      console.log("User is logged in");
                      this.authService.setSession(data);
                      this.router.navigateByUrl('/home');
                  }
              );
      }
  }
}
