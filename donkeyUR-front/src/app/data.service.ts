import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl;

  register(user: any) {


    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.post(this.url+'/api/users', user, { headers });


  }

  getUserData(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(this.url + `/api/users/${id}`, { headers });

  }

  updateUserData(id: string, user: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put(this.url + `/api/users/${id}`, user, { headers });


  }

  updateUserPassword(id: string, user: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put(this.url + `/api/users/changePassword/${id}`, user, { headers });
  }
  deleteUser(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.delete(this.url + `/api/users/${id}`, { headers });

  }

  getAllUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(this.url + '/api/users', { headers });

  }


}
