import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private API_PATH = environment.apiUrl;

  protected LIST_OF_USERS: string = "/ig/users";
  protected LIST_OF_USERS_FEED: string = "/ig/user/feeds";
  protected LIST_OF_USERS_CONTACTS: string = "/ig/user/contacts";
  
  constructor(private http: HttpClient) { }

  getHttpHeaders() {
    return new HttpHeaders({
      authKey: `hWuFhhPVij`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  getUsers(searchParam: string, limit: number): Observable<any> {
    return this.http.get<any>(`${this.API_PATH}${this.LIST_OF_USERS}?q=${searchParam}&limit=${limit}`, {
      headers: this.getHttpHeaders(),
    });
  }

  getUserFeed(username: string, after: string): Observable<any> {
    return this.http.get<any>(`${this.API_PATH}${this.LIST_OF_USERS_FEED}?url=${username}`, {
      headers: this.getHttpHeaders(),
    });
  }

  getUserContacts(username: string): Observable<any> {
    const platform = 'instagram';
    return this.http.get<any>(`${this.API_PATH}${this.LIST_OF_USERS_CONTACTS}?url=${username}&platform=${platform}`, {
      headers: this.getHttpHeaders(),
    });
  }
}
