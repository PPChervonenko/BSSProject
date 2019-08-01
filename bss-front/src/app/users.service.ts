import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './models/user';
import {Page} from './users/users-table/page';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8888/api/users';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }


  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}` + `/create`, user);
  }

  updateUser(id: number, value: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUsersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getUsersByLastName(lastName: string): Observable<Array<User>> {
    return this.http.get<User[]>(`${this.baseUrl}/lastName/${lastName}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/delete`, { responseType: 'text' });
  }
  public   getUsers(page: number, itemsPerPage: number): Observable<Page> {
    // tslint:disable-next-line:prefer-const
    let users = this.http.get<User[]>(this.baseUrl);

    return this.getPageItems(users, page, itemsPerPage);

  }
  private getPageItems(users: Observable<Array<User>>, page: number, itemsPerPage: number): Observable<Page> {
    return users.pipe(
      map(u => {

        // tslint:disable-next-line:prefer-const
        let startIndex = itemsPerPage * (page - 1);
        return new Page(u.length, u.slice(startIndex, startIndex + itemsPerPage));
      }));
  }
}
