import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { distinct, foldSum, orderBy, compose, distinctCompleteItem} from '../../utils/utils';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-repository-search-topics',
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
  ],
  templateUrl: './repository-search-topics.component.html',
  styleUrl: './repository-search-topics.component.css',
})
export class RepositorySearchTopicsComponent {
  reposParams: string = '';
  reposResponse: any[] = [];
  reposResponseCopy: any[] = [];
  languageSelected: string = '';
  options: any[] = [];
  starsCount: number = 0;

  constructor(private appService: AppService) {}

  selectedCompose: string = 'default'; // Valor padrão que é definido para o compose sempre que a requisição for feita.

  getReposByTopic() {
    const topic = this.reposParams.trim();
    // Adiciona o prefixo "topic:" para a chamada da API
    const query = topic ? `topic:${topic}` : '';
  
    this.appService.getRepos(query).subscribe((data: any) => {
      // Filtra os repositórios que contenham o tópico no array 'topics'
      this.reposResponse = this.reposResponseCopy = data.items.filter((repo: any) => repo.topics.includes(topic));

      this.selectedCompose = 'default';
    });
  }

  composeRepos(option: string) {

    if (option === 'compose1') {
      // Ordena os repositórios pelo número de estrelas e, em seguida, remove possíveis repositórios duplicados com base na linguagem.
    
      const processRepos = compose(
        // Função 1: Remove possíveis repositórios duplicados com base na linguagem
        (repos: any[]) => distinctCompleteItem(repos, 'language'),

        // Função 2: Ordena os repositórios pelo número de estrelas
        (repos: any[]) => orderBy(repos, 'stargazers_count', 
          function compareByStargazersCount(attribute: string) {
            return (a: any, b: any) => {
              return b[attribute] - a[attribute]; // Para ordenar do menor para o maior
            };
          }
        ), 
      );

      this.reposResponse = processRepos(this.reposResponse)

    } else {
      // Caso padrão
      this.getReposByTopic(); // Traz os resultados sem alterações.
    }
  }

}
