import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  register(user: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.post('http://localhost:1337/api/users', user, { headers });


  }

  getUserData(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get(`http://localhost:1337/api/users/${id}`, { headers });

  }

  updateUserData(id: string, user: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put(`http://localhost:1337/api/users/${id}`, user, { headers });


  }

  updateUserPassword(id: string, user: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.put(`http://localhost:1337/api/users/changePassword/${id}`, user, { headers });
  }
  deleteUser(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.delete(`http://localhost:1337/api/users/${id}`, { headers });

  }

  getAllUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.http.get('http://localhost:1337/api/users', { headers });

  }


}
