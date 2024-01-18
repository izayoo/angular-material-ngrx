import {UsersState, UserState, usersReducer, userReducer} from "./users/users.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  users: UsersState;
  user: UserState
}

export const reducers: ActionReducerMap<AppState> = {
  users: usersReducer,
  user: userReducer,
};
