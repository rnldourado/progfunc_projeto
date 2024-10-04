import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  compose,
  distinct,
  foldSum,
  groupBy,
  orderBy,
} from '../../utils/utils';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-repository-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    MatDivider,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  templateUrl: './repository-search.component.html',
  styleUrl: './repository-search.component.css',
})
export class RepositorySearchComponent {
  reposParams: string = '';
  reposResponse: any[] = [];
  reposResponseCopy: any[] = [];
  languageSelected: string = '';
  options: any[] = [];
  starsCount: number = 0;
  groupBy: any = {};
  groupList: any = [];
  readonly panelOpenState = false;

  constructor(private appService: AppService) { }

  selectedLanguage(lang: string) {
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

  groudByLanguage() {
    this.groupBy = groupBy(this.reposResponse, 'language');
  }

  getRepos() {
    this.appService.getRepos(this.reposParams).subscribe((data: any) => {
      this.options = distinct(data.items, 'language');

      this.reposResponse = this.reposResponseCopy = orderBy(
        data.items,
        'stargazers_count',
        function (param: any) {
          return (a: any, b: any) => b[param] - a[param];
        }
      );

      this.starsCount = foldSum(this.reposResponse, 'stargazers_count');
      this.groupBy = groupBy(this.reposResponse, 'language');
      this.groupList = Object.keys(this.groupBy);
    });
  }
}
