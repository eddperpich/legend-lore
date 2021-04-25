import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActionEvent, Menu} from '../../assets/data';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuguryApi {
  constructor(private client: HttpClient) {
  }

  url = 'https://api.homie.estate/api';
  apiKey = 'wl9AdZKG0466rzZEDhtkBNDC';

  getActionEventsByPlayer(name: string): Observable<ActionEvent[]> {
    const url = this.url + '/action-events/player/' + name;
    return this.client.get<ActionEvent[]>(url, {
      observe: 'body',
      headers: {
        apiKey: this.apiKey
      }
    }).pipe(
      catchError((err => {
        console.error(err);
        return of([]);
      }))
    );
  }

  getMenu(): Observable<Menu> {
    const url = this.url + '/menu/';
    return this.client.get<Menu>(url, {
      observe: 'body',
      headers: {
        apiKey: this.apiKey
      }
    }).pipe(
      catchError((err => {
        console.error(err);
        return of({
          players: [],
          encounters: [],
          sessions: [],
          actions: []
        });
      }))
    );
  }
}
