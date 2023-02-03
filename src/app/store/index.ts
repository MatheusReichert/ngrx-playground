import { Action, ActionReducerMap, createSelector } from "@ngrx/store";
import { PersonActions } from "../actions/persons.actions";
import { Person } from "../person";
import * as fromPersonReducer from "../reducers/person.reducer";
import * as fromPersonActions from '../actions/persons.actions';
export interface AppState
{
  people: fromPersonReducer.PeopleState;
}

export const appReducers: any | ActionReducerMap<AppState>= {
  people: fromPersonReducer.reducer
}

