import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),

    });
  }

  public register() {
    const val = this.form.value;

    const be_val = {
      nom: val.lastname,
      prenom: val.firstname,
      email: val.email,
      tel: val.tel,
      adresse: val.adress,
      password: val.password,
      dateDeNaissance: val.birthDate,

    }

    // validate the form
    if (this.form.invalid) {
      // show an error message
      return;
    }
    else {
      // send the data to the server
      this.dataService.register(be_val).subscribe(
        (data: any) => {
          console.log("User is registered");
          this.router.navigateByUrl('/login');
        }
      );
    }
    
  }

}
