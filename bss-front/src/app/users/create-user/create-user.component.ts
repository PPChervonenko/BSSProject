import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UsersService} from '../../users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  submitted = false;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  newCustomer(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.usersService.createUser(this.user)
      .subscribe(data => console.log(data), error => console.log(error));
    this.user = new User();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
