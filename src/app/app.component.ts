import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import { faker } from '@faker-js/faker';
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import {
  PersonAll,
  PersonDelete,
  PersonNew,
  PersonUpdate,
} from './actions/persons.actions';

import * as fromPersonSelectors from './store/person.selectors'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngrx-playground';

  peoples$!: Observable<Person[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new PersonAll());
    //this.peoples$ = this.store.pipe(select('people'));
    this.peoples$ = this.store.select(fromPersonSelectors.selectAll);
  }

  addNew() {
    let person: Person = {
      name: faker.name.fullName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      country: faker.address.country(),
      age: Math.round(Math.random() * 100),
      id: new Date().getMilliseconds().toString(),
    };
    this.store.dispatch(new PersonNew({ person }));
  }

  update(person: Person) {

    const p: Person ={
      name  : faker.name.fullName(),
      address : faker.address.streetAddress(),
      city : faker.address.city(),
      country : faker.address.country(),
      age : Math.round(Math.random() * 100),
      id: person.id
    }


    this.store.dispatch(new PersonUpdate({ id: p.id || "typescript cheat", changes: p }));
  }

  delete(p: Person) {
    this.store.dispatch(new PersonDelete({ id: p.id || "typescript cheat"}));
  }
}
