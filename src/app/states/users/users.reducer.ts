import {combineReducers, createReducer, on} from '@ngrx/store';
import { UsersActions } from "./users.actions";
import {User} from "../../models/user";

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[],
  error: string | null,
  status: 'pending' | 'loading' | 'error' | 'success';
}

export interface UserState {
  user: User,
  error: string | null,
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialUsersState: UsersState = {
  users: [],
  error: null,
  status: 'pending'
};

export const initialUserState: UserState = {
  user: {
    id: 0,
    first_name: '',
    last_name: ''
  },
  error: null,
  status: 'pending'
};

export const reducer = createReducer(
  initialUsersState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(UsersActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    users: data,
    error: null,
    status: 'success'
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  })),
  on(UsersActions.createUser, (state, { data }) => ({
    ...state,
    users: [...state.users, data]
  })),
  on(UsersActions.updateUser, (state, { id, data }) => ({
    ...state,
    users: [...state.users, data]
  })),
  on(UsersActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id != id)
  }))
);

export const reducerB = createReducer(
  initialUserState,
  on(UsersActions.loadUserSuccess, (state, { data }) => ({
    ...state,
    user: data,
    error: null,
    status: 'success'
  })),
  on(UsersActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  })),
  on(UsersActions.createUserSuccess, (state, { data }) => ({
    ...state,
    error: null,
    status: 'success'
  })),
  on(UsersActions.createUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  })),
  on(UsersActions.updateUserSuccess, (state, { data }) => ({
    ...state,
    error: null,
    status: 'success'
  })),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  })),
  on(UsersActions.deleteUserSuccess, (state, { data }) => ({
    ...state,
    error: null,
    status: 'success'
  })),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error'
  }))
);

export const userReducer = combineReducers({
  users: reducer,
  user: reducerB
});
