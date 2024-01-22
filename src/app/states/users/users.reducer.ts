import {createReducer, on} from '@ngrx/store';
import { UsersActions } from "./users.actions";
import {User} from "../../models/user";

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[],
  user: User,
  error: string | null,
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialUsersState: UsersState = {
  users: [],
  user: {
    id: 0,
    first_name: '',
    last_name: '',
  },
  error: null,
  status: 'pending'
};

export const usersReducer = createReducer(
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
    users: [...state.users, data],
    user: data,
    status: 'pending'
  })),
  on(UsersActions.updateUser, (state, { id, data }) => ({
    ...state,
    users: [...state.users, data],
    status: 'pending'
  })),
  on(UsersActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id != id),
    status: 'pending'
  })),
  on(UsersActions.loadUser, (state) => ({
    ...state,
    status: 'loading'
  })),
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
