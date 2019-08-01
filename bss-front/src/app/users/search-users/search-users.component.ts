import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  lastName: string;
  users: User[];

  constructor(private dataService: UsersService) { }

  ngOnInit() {
    this.lastName = '';
  }

  private searchCustomers() {
    this.dataService.getUsersByLastName(this.lastName)
      .subscribe(users => this.users = users);
  }

  onSubmit() {
    this.searchCustomers();
  }
}
