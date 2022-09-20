import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SessionService } from '@app/shared/services/session/session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { roles } = route.data;
    if (!roles) return false;

    let hasAccess = false;

    if (this.sessionService.isAuthorized()) {
      hasAccess = roles.some((r: any) => this.sessionService.hasRole(r));
    }

    if (!hasAccess) return this.router.navigate(['/my-settings']);

    return hasAccess;
  }
}
