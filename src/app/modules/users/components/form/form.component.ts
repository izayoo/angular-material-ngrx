import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersActions} from "../../../../states/users/users.actions";
import {select, Store} from "@ngrx/store";
import {Subject, takeUntil} from "rxjs";
import {selectUser} from "../../../../states/users/users.selectors";
import {AppState} from "../../../../states/app.states";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  userFormGroup!: FormGroup;
  title = "Add User";
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      id: [{ value:'', disabled:this.activatedRoute.snapshot.params['id'] },
        [Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.max(99999999)], []],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
    }, { updateOn: 'blur' });

    if (this.activatedRoute.snapshot.params['id']) {
      this.title = "Edit User";
      this.store.pipe(select(selectUser), takeUntil(this.destroy$)).subscribe((user) => {
        this.userFormGroup.setValue(user);
      });
      this.store.dispatch(UsersActions.loadUser({id:this.activatedRoute.snapshot.params['id']}));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
    if (this.userFormGroup.valid) {
      if (this.activatedRoute.snapshot.params['id'] &&
        this.activatedRoute.snapshot.params['id'] == this.userFormGroup.get('id')?.value) {
        this.store.dispatch(UsersActions.updateUser({
          id: this.activatedRoute.snapshot.params['id'],
          data: this.userFormGroup.getRawValue()
        }));
      } else {
        this.store.dispatch(UsersActions.createUser({data: this.userFormGroup.getRawValue()} ));
      }
      this.router.navigate(['users']);
    }

    this.userFormGroup.markAllAsTouched();
  }
}
