import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Action, Store} from "@ngrx/store";
import {AppState} from "../app.states";
import {UserService} from "../../services/user/user.service";
import {UsersActions} from "./users.actions";
import {Observable, of} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';



@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              userService: UserService) {
    this.userService = userService;
  }

  private userService: UserService;

  loadUsers$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.userService.getAll().pipe(
          map((data: any) => UsersActions.loadUsersSuccess({ data })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  )

  loadUser$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(UsersActions.loadUser),
      switchMap(() =>
        this.userService.getAll().pipe(
          map((data: any) => UsersActions.loadUsersSuccess({ data })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  )

  createUser$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(UsersActions.createUserSuccess, UsersActions.createUserFailure),
      switchMap(() =>
        this.userService.getAll().pipe(
          map((data: any) => UsersActions.loadUsersSuccess({ data })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  )

  updateUser$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(UsersActions.updateUserSuccess, UsersActions.updateUserFailure),
      switchMap(() =>
        this.userService.getAll().pipe(
          map((data: any) => UsersActions.loadUsersSuccess({ data })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  )

  deleteUser$: any = createEffect((): any =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUserSuccess, UsersActions.deleteUserFailure),
      switchMap(() =>
        this.userService.getAll().pipe(
          map((data: any) => UsersActions.loadUsersSuccess({ data })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  )
}
