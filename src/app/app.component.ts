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
  reposResponseCopy: any[] = [];
  languageSelected: string = '';
  options: any[] = [];
  starsCount: number = 0;

  usersResponse: any[] = [];

  constructor(private appService: AppService) {}

  selectedLanguage(lang: string) {
    console.log('Selected Language:', lang);
    if (lang === this.languageSelected || lang === 'Limpar') {
      this.reposResponse = this.reposResponseCopy;
      this.starsCount = foldSum(this.reposResponse, 'stargazers_count');
      return;
    }
    this.reposResponse = this.reposResponseCopy.filter((item: any) => {
      return item.language === lang;
    });
    this.starsCount = foldSum(this.reposResponse, 'stargazers_count');

    this.languageSelected = lang;
  }

  getRepos() {
    this.appService.getRepos(this.reposParams).subscribe((data: any) => {
      // console.log('Filtered Data:', groupBy(data.items, 'owner.login'));

      // console.log('forks:', foldSum(data.items, 'forks'));
      // console.log('distinct', distinct(data.items, 'language'));

      this.options = distinct(data.items, 'language');

      this.reposResponse = this.reposResponseCopy = orderBy(
        data.items,
        'stargazers_count',
        function (param: any) {
          return (a: any, b: any) => b[param] - a[param];
        }
      );

      this.starsCount = foldSum(this.reposResponse, 'stargazers_count');
    });
  }

  getUsers() {
    this.appService.getUsers(this.usersParams).subscribe((data: any) => {
      this.usersResponse = data.items;
    });
  }
}
