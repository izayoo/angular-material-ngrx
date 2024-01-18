import { createFeatureSelector, createSelector } from '@ngrx/store';
import {AppState} from "../app.states";
import {UsersState} from "./users.reducer";

export const users = (state: AppState) => state.users;
export const usersList = createSelector(
  users,
  (state: UsersState) => state.users
);
