import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs';
import {UserFormComponent} from '../forms/user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})
export class UserFormDeactivateGuard implements CanDeactivate<UserFormComponent> {
  canDeactivate(component: UserFormComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !component.hasUnsavedData() || confirm('На странице есть не сохранённые изменения. Продолжить ?');
  }
}
