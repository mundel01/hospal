import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { APP_NAVIGATION, APP_URL } from '@config/index';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { NotificationMessageService } from '@app/shared/services/notification/notification.service';
import { Role, RoleType } from '@custom-types/role.enum';
import { SessionService } from '@app/shared/services/session/session.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
  @Input() theme = '';
  @Input() expanded = false;
  @Output('onToggle') onToggle: EventEmitter<string> = new EventEmitter();
  Role = Role;
  appNavigations: Array<any> = APP_NAVIGATION;
  activeId = '';
  private subs = new SubSink();
  hasNewNotifications: boolean = true;
  currentUser: any = {};

  isCollapsed = false;
  
  constructor(
    // private user: UserService,
    private session: SessionService,
    private router: Router // private notificationService: NotificationMessageService
  ) {}

  ngOnInit() {
    // this.subs.sink = timer(0, 10000)
    //   .pipe(switchMap(() => this.notificationService.getMyNotifications()))
    //   .subscribe((result) => {
    //     console.log('Notification result', result);
    //   });
    this.currentUser = this.session.user;
    console.log(this.currentUser);
  }

  handleAction(nav: any, event: MouseEvent) {
    // event.stopPropagation();

    // if (nav.url === '/users' || nav.url === 'users') {
    //   this.user.openUserPanel();
    // }
  }

  toggleSubMenu(menuId: any) {
    if (menuId === this.activeId) {
      this.activeId = '';
      return;
    }
    this.activeId = menuId;
  }

  isChildActive(menuId: any): boolean {
    const currentRoute: string = this.router.url;

    const navList: any[] = [...this.appNavigations];
    const navItem: any = navList.filter((nav) => nav.label === menuId)[0];
    if (navItem.children) {
      return navItem.children.some((child: any) =>
        currentRoute.includes(child.url)
      );
    }
    return false;
  }

  gotoSettings() {
    this.router.navigate([`/${APP_URL.PROFILE}`]);
  }

  logout = () => {
    this.session.logout();
  };

  toggle() {
    this.onToggle.emit();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
