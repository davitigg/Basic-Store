import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../_interfaces/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserModel[]>('https://localhost:5001/api/Users', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`https://localhost:5001/api/Users/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteUsers(ids: number[]) {
    return this.http.delete('https://localhost:5001/api/Users/', {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: ids,
    });
  }

  updateUser(updatedUser: UserModel) {
    return this.http.put(
      `https://localhost:5001/api/Users/${updatedUser.id}`,
      updatedUser,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }
}
