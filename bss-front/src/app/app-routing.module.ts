import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent} from './users/users-list/users-list.component';
import {SearchUsersComponent} from './users/search-users/search-users.component';
import {CreateUserComponent} from './users/create-user/create-user.component';
import {UsersTableComponent} from './users/users-table/users-table.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserFormComponent} from './forms/user-form/user-form.component';
import {AuthGuard} from './guards/auth.guard';
import {UserFormDeactivateGuard} from './guards/user-form-deactivate.guard';


const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UsersListComponent },
  {path: 'users/:id', component: UserFormComponent, canDeactivate: [UserFormDeactivateGuard]},
  { path: 'add', component: CreateUserComponent },
  { path: 'findbylastname', component: SearchUsersComponent },
  { path: 'user-table', component: UsersTableComponent,  canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
