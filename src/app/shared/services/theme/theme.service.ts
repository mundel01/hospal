import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'light'
      : 'light';
  private _subject: BehaviorSubject<string> = new BehaviorSubject(this._theme);

  get theme() {
    return this._theme;
  }

  set theme(theme: string) {
    this._theme = theme;
    this._subject.next(this._theme);
  }

  subscribe(callback: (theme: string) => void) {
    return this._subject.subscribe(callback);
  }
}
