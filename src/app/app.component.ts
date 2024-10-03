import { AppService } from './app.service';
import { foldSum, groupBy, orderBy, distinct } from '../utils/utils';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectRepositoriesLanguages: string[] = [];
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

      console.log('forks:', foldSum(data.items, 'forks'));
      console.log('distinct', distinct(data.items, 'language'));

      this.reposResponse = orderBy(
        data.items,
        'stargazers_count',
        function (param: any) {
          return (a: any, b: any) => b[param] - a[param];
        }
      );
    });
  }

  getUsers() {
    this.appService.getUsers(this.usersParams).subscribe((data: any) => {
      this.usersResponse = data.items;
    });
  }
}
