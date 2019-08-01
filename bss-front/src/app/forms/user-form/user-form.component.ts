import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {NgForm} from '@angular/forms';
import {UsersService} from '../../users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  public  user: User = new User();
  public formSubmited: boolean;

  // @ts-ignore
  @ViewChild('userForm')
  private userForm: NgForm;

  constructor( private userService: UsersService,
               private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.formSubmited = false;
    const userId = this.activateRoute.snapshot.paramMap.get('id');

    this.userService.getUser(+userId).subscribe(u => {
      this.user = u;
    });
  }

  public cleanButtonClicked() {
    this.user = new User();
  }
  public hasUnsavedData(): boolean {
    return this.userForm.dirty;
  }
  public onSubmited() {
    const userId = this.activateRoute.snapshot.paramMap.get('id');
    this.userService.updateUser(+userId, this.user).subscribe(data => console.log(data), error => console.log(error));
    this.formSubmited = true;
  }
}
