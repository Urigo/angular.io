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
import { HeroService } from './hero.service';

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
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private apollo: Angular2Apollo
  ) {}

  ngOnInit(): void {
    // this.route.params
    //   .switchMap((params: Params) => this.heroService.getHero(+params['id']))
    //   .subscribe(hero => this.hero = hero);

    this.route.params.subscribe(params => {
      const heroId = params['id'];

      // #docregion graphql-query
      this.heroObservable = this.apollo.watchQuery({
        query: gql`
          query Hero($heroId: Int!) {
            hero(heroId: $heroId) {
              id
              name
            }
          }
        `,
        variables: { heroId: heroId }
      });

      this.heroSubscription = this.heroObservable.subscribe(({data, loading}) => {
        this.hero = data.hero;
      });
      // #enddocregion graphql-query
    });
  }

  // #docregion save
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
  // #enddocregion save

  goBack(): void {
    this.location.back();
  }
}
