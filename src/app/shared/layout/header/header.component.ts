import { Output, Component, OnInit, EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, switchMap, timer } from 'rxjs';
import { TitleService } from '@app/shared/services/title/title.service';
import { NotificationMessageService } from '@app/shared/services/notification/notification.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private readonly titleService: TitleService,
    private readonly router: Router,
    private notificationMessageService: NotificationMessageService
  ) {}

  expanded = true;
  @Output('onToggle') onToggle: EventEmitter<boolean> = new EventEmitter();

  title: string = '';
  private subs = new SubSink();
  notifications: any[] = [];
  unreadNotificationCount: number = 0;

  updateNotifications(notifications: any[]) {
    this.notifications = notifications.map((notification: any) => {
      return {
        id: notification.id,
        message: notification.message,
        isRead: notification.isRead,
      };
    });

    this.unreadNotificationCount = notifications.filter(
      (notification: any) => notification.isRead == false
    ).length;
  }

  ngOnInit(): void {
    this.subs.sink = timer(0, 12000)
      .pipe(
        switchMap(() => this.notificationMessageService.getMyNotifications())
      )
      .subscribe((result: any) => {
        this.updateNotifications(result.data.rows);
      });

    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        debounceTime(200)
      )
      .subscribe(() => {
        this.title = this.titleService.get();
      });
  }

  readOne(id: string) {
    return this.notificationMessageService.readOne(id).subscribe();
  }

  readAll() {
    return this.notificationMessageService.readAll().subscribe();
  }

  onToggleMenu() {
    this.expanded = !this.expanded;
    this.onToggle.emit(this.expanded);
  }
}
