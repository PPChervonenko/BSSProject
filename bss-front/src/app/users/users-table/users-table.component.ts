import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  public  page: number;

  public  collectionSize: number;

  public  users: Array<User>;

  public itemsPerPage = 10;

  constructor(private userService: UsersService ) {
    this.page = 1;
    this.loadPage();

  }

  ngOnInit() {
  }

  onPageChange($event: number) {
    this.loadPage();
  }

  private loadPage() {
    this.userService.getUsers(this.page, this.itemsPerPage)
      .subscribe(p => {
        this.users = p.rows;
        this.collectionSize = p.totalCount;
      });
  }

}
