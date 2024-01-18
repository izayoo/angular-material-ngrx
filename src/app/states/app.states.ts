import {UsersState, UserState} from "./users/users.reducer";

export interface AppState {
  users: UsersState,
  user: UserState
}
