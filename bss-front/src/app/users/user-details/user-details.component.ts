import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../users.service';
import {UsersListComponent} from '../users-list/users-list.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;

  constructor(private userService: UsersService, private listComponent: UsersListComponent) { }

  ngOnInit() {
  }

  updateActive(isActive: boolean) {
    this.userService.updateUser(this.user.id,
      { name: this.user.firstName, age: this.user.lastName, active: isActive })
      .subscribe(
        data => {
          console.log(data);
          this.user = data as User;
        },
        error => console.log(error));
  }

  deleteUser() {
    this.userService.deleteUser(this.user.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }
}
