// #docregion , search
import { Component, OnInit } from '@angular/core';

import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import gql from 'graphql-tag';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ]
})
// #enddocregion search
export class DashboardComponent implements OnInit {
  heroes: ApolloQueryObservable<any>;
  
  constructor(private apollo: Angular2Apollo) { }

  ngOnInit(): void {

    this.heroes = this.apollo.watchQuery({
      query: gql`
        query allHeroes {
          heroes {
            id
            name
          }
        }
      `,
    });

  }
}
