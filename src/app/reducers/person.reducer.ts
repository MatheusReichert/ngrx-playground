import { state } from '@angular/animations';
import * as fromPersonActions from '../actions/persons.actions';
import { Person } from '../person';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export interface PeopleState extends EntityState<Person> {}

export const peopleAdapter: EntityAdapter<Person> =
  createEntityAdapter<Person>({
    selectId: (instance) => instance.id
  });

export const initialState: PeopleState = peopleAdapter.getInitialState({});

export function reducer(
  state: PeopleState = initialState,
  action: fromPersonActions.PersonActions
) {
  switch (action.type) {
    case fromPersonActions.PersonActionTypes.PERSON_NEW:
      return peopleAdapter.addOne(action.payload.person, state);
    case fromPersonActions.PersonActionTypes.PERSON_DELETE:
      return peopleAdapter.removeOne(action.payload.id, state);
    case fromPersonActions.PersonActionTypes.PERSON_UPDATE:
      return peopleAdapter.updateOne({id: action.payload.id, changes: action.payload.changes}, state);
    default:
      return state;
  }
}
