// #docregion
import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import {Angular2Apollo, ApolloQueryObservable} from 'angular2-apollo';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import gql from 'graphql-tag';

import { Hero }        from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: [ 'hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  private heroId: Subject<string> = new Subject<string>();

  private heroSubscription: Subscription;
  private heroObservable: ApolloQueryObservable<any>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private apollo: Angular2Apollo
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const heroId = params['id'];

      // #docregion graphql-query-new-field
      this.heroObservable = this.apollo.watchQuery({
        query: gql`
          query Hero($heroId: Int!) {
            hero(heroId: $heroId) {
              id
              name
              age
            }
          }
        `,
        variables: { heroId: heroId }
      });
      // #enddocregion graphql-query-new-field

      this.heroSubscription = this.heroObservable.subscribe(({data, loading}) => {
        this.hero = data.hero;
      });
    });
  }

  // #docregion save
  save(): void {
  }
  // #enddocregion save

  goBack(): void {
    this.location.back();
  }
}
