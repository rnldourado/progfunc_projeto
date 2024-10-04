import { AppService } from './app.service';
import { foldSum, groupBy, orderBy, distinct } from '../utils/utils';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  reposParams: string = '';
  reposResponse: any[] = [];
  reposResponseCopy: any[] = [];
  languageSelected: string = '';
  starsCount: number = 0;

  issuesParams: string = '';
  issuesResponse: any[] = [];
  issuesResponseCopy: any[] = [];
  selectedState: string = '';

  constructor(private appService: AppService) {}

  //issues
  getIssues() {
    this.appService.getIssues(this.issuesParams).subscribe((data: any) => {
      this.issuesResponse = this.issuesResponseCopy = data.items;
    });
  }
}
