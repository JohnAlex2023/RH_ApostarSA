import { Observable, map } from 'rxjs';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/account/authentication.service';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { User } from '@models/account/user.model';

@Injectable({ providedIn: 'root' })
export class RoleGuard  {
  constructor(private router: Router, private service: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.service.getAccount().pipe(
      map(model => this.handleAuthorization(model, route))
    );
  }

  private handleAuthorization(
    model: User,
    route: ActivatedRouteSnapshot
  ) {
    const userRoles = model?.roles;
    if(userRoles){
      if (userRoles.some(role => route.data.roles.includes(role.name))) {
        return true;
      } else {
        this.router
          .navigate(['/404'])
          .then();
          return false;
      }
    } else {
      this.router
          .navigate(['/404'])
          return false;
    }
  }
}
