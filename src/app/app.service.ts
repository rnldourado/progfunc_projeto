import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  url = 'https://api.github.com/search/';

  constructor(private http: HttpClient) {}

  getRepos(param: string) {
    return this.http.get(`${this.url}repositories?q=${param}`);
  }

  getUsers(param: string) {
    return this.http.get(`${this.url}users?q=${param}`);
  }

  getIssues(param: string) {
    return this.http.get(`${this.url}issues?q=${param}`);
  }
}
