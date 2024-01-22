import { createSelector } from '@ngrx/store';
import {AppState} from "../app.states";
import {UsersState} from "./users.reducer";

export const selectUsersState = (state: AppState) => state.users;

export const selectUsersList = createSelector(
  selectUsersState,
  (usersState: UsersState) => usersState.users
);

export const selectUser = createSelector(
  selectUsersState,
  (usersState: UsersState) => usersState.user
);
