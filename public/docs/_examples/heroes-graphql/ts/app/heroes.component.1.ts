// #docregion
import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

// #docregion import-apollo
//..
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
//..
// #enddocregion import-apollo
// #docregion import-graphql-tag
//..
import gql from 'graphql-tag';
//..
// #enddocregion import-graphql-tag
import { ApolloQueryResult } from 'apollo-client';
import { Hero }              from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: [ 'heroes.component.css' ]
})
export class HeroesComponent implements OnInit {
  // #docregion this-heroes
  heroes: Hero[];
  selectedHero: Hero;
  // #enddocregion this-heroes

// #docregion inject-apollo
  constructor(
    private apollo: Angular2Apollo,
    private router: Router) { }
  // #enddocregion inject-apollo  

  // #docregion query-heroes
  getHeroes(): void {
    this.apollo.watchQuery({
      query: gql`
        query allHeroes {
          heroes {
            id
            name
          }
        }
      `,
    }).subscribe((queryResult: ApolloQueryResult) => {
      this.heroes = queryResult.data.heroes;
    });
    // #enddocregion query-heroes
  }

  // #docregion add
  add(name: string): void {
  }
  // #enddocregion add

  // #docregion delete
  delete(hero: Hero): void {
    // this.heroService
    //     .delete(hero.id)
    //     .then(() => {
    //       this.heroes = this.heroes.filter(h => h !== hero);
    //       if (this.selectedHero === hero) { this.selectedHero = null; }
    //     });
  }
  // #enddocregion delete

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
