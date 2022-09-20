import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, Subscription, switchMap, timer } from 'rxjs';
import { SessionService } from './shared/services/session/session.service';
import { TitleService } from './shared/services/title/title.service';
import { ThemeService } from './shared/services/theme/theme.service';
import { StorageService } from './shared/services/storage/storage.service';
import { SubSink } from 'subsink';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  theme = '';
  loggedIn = false;
  expanded = false;

  private _authSubscription: Subscription;
  private subs = new SubSink();

  constructor(
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    private title: TitleService,
    private themeService: ThemeService,
    private storage: StorageService
  ) {
    // this.loggedIn = this.session.token ? true : false;           //undo 
    this.loggedIn = true;
    this._authSubscription = this.session.subscribe(
      // (loggedIn: boolean) => (this.loggedIn = loggedIn);          //undo 
      (loggedIn: boolean) => (this.loggedIn = true)
    );

    this.expanded = this.storage.get('_expanded', 'localStorage') || false;
  }

  ngOnInit(): void {
    this.subs.sink = this.themeService.subscribe((theme: string) => {
      this.theme = theme;
      document.body.classList.add(this.theme);
    });

    this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof NavigationEnd))
      .subscribe(() => {
        const { routeConfig }: ActivatedRoute = this._child(this.route);

        if (routeConfig && routeConfig.data && routeConfig.data['title']) {
          this.title.set(routeConfig.data['title']);
        }
      });
  }

  ngOnDestroy(): void {
    this._authSubscription.unsubscribe();
    this.subs.unsubscribe();
  }

  handleSidenavToggle() {
    this.expanded = !this.expanded;
    this.storage.set('_expanded', this.expanded, 'localStorage');
  }

  private _child(route: ActivatedRoute): ActivatedRoute {
    if (route.firstChild) {
      return this._child(route.firstChild);
    }

    return route;
  }
}
