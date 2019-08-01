import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.reloadData();
  }

  deleteUsers() {
    this.usersService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  reloadData() {
    this.users = this.usersService.getUsersList();
  }
}
