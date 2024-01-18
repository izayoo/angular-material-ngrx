import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from "../../models/user";

export const UsersActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: string }>(),
    'Load User': props<{ id: number }>(),
    'Load User Success': props<{ data: User }>(),
    'Load User Failure': props<{ error: string }>(),
    'Create User': props<{ data: User }>(),
    'Create User Success': props<{ data: User }>(),
    'Create User Failure': props<{ error: string }>(),
    'Update User': props<{ id:number, data: User }>(),
    'Update User Success': props<{ data: User }>(),
    'Update User Failure': props<{ error: string }>(),
    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ data: string }>(),
    'Delete User Failure': props<{ error: string }>(),
  }
});
