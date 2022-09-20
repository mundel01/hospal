import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationMessageService {
  private url = `${env.api}/user/myNotifications`;
  private updateUrl: string = `${env.api}/notifications`;

  constructor(private http: HttpClient) {}

  getMyNotifications(): Observable<any> {
    return this.http.get(this.url);
  }

  readOne(id: string) {
    return this.http.patch(`${this.updateUrl}/is-read/${id}`, {});
  }

  readAll() {
    return this.http.patch(`${this.updateUrl}/markAll`, {});
  }
}
