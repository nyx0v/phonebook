import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { formatDate } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  form_on: boolean = false;
  public updateUserForm!: FormGroup;

  constructor(private dataService: DataService, private authService: AuthService) {
   // this.user = localStorage.getItem('User');
 

    
  }

  ngOnInit() {
    this.updateUserForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      birthDate: new FormControl('', [Validators.required])
    });


    


    console.log(localStorage.getItem('userid'));
    this.dataService.getUserData(localStorage.getItem('userid') as string).subscribe( (data: any) => {
      this.user = data;
      console.log(this.user);
    });
  }

  toggleForm(){
    this.form_on = true;
    this.updateUserForm.setValue({
      firstname: this.user.prenom,
      lastname: this.user.nom,
      email: this.user.email,
      tel: this.user.tel,
      adress: this.user.adresse,
      password: "",
      birthDate: formatDate(this.user.dateDeNaissance, 'yyyy-MM-dd', 'en'),
    });

  }
  updateUser(){

    const val = this.updateUserForm.value;
    // validate the form
    if (this.updateUserForm.invalid) {
      // show an error message
      console.log("invalid form");
      return;
    }

    const be_val = {
      nom: val.lastname,
      prenom: val.firstname,
      email: val.email,
      tel: val.tel,
      adresse: val.adress,
      password: val.password,
      dateDeNaissance: val.birthDate,


    }
    // send the form to the server
    if(val.password == "")
      this.dataService.updateUserData(localStorage.getItem('userid') as string, be_val).subscribe(
        (data: any) => {
          console.log("User is updated");
          this.form_on = false;
          this.ngOnInit();
        }
      );
    else
      this.dataService.updateUserPassword(localStorage.getItem('userid') as string, be_val).subscribe(
        (data: any) => {
          console.log("User is updated");
          this.form_on = false;

          this.authService.logout();
          this.ngOnInit();
        }
      );

    
  }

}
