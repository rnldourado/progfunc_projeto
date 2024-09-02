import { AppService } from './app.service';
import { groupBy, orderBy } from '../utils/utils';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  reposParams: string = '';
  usersParams: string = '';

  reposResponse: any[] = [];
  usersResponse: any[] = [];

  constructor(private appService: AppService) {}

  getRepos() {
    this.appService.getRepos(this.reposParams).subscribe((data: any) => {
      const a = data.items.filter((item: any) => {
        return item?.license?.key === 'mit';
      });
      console.log('Filtered Data:', groupBy(data.items, 'owner.login'));
      console.log('Filtered Data:', orderBy(data.items, 'stargazers_count'));

      this.reposResponse = orderBy(data.items, 'stargazers_count');
    });
  }

  getUsers() {
    this.appService.getUsers(this.usersParams).subscribe((data: any) => {
      console.log('Data:', data);
      this.usersResponse = data.items;
    });
  }
}
