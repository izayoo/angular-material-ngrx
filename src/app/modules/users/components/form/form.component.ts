import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user/user.service";
import {UsersActions} from "../../../../states/users/users.actions";
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(fb: FormBuilder, activatedRoute: ActivatedRoute, userService: UserService,
              router: Router, store: Store) {
    this.store = store;
    this.router = router;
    this.userService = userService;
    this.activatedRoute = activatedRoute;
    this.fb = fb;
  }

  userFormGroup!: FormGroup;
  title = "Add User";
  fb: FormBuilder;
  activatedRoute: ActivatedRoute;
  private router: Router;
  private store: Store;
  userService: UserService;

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
      this.userFormGroup.setValue(this.userService.getOneById(this.activatedRoute.snapshot.params['id']));
    }
  }

  submit() {
    if (this.userFormGroup.valid) {
      if (this.activatedRoute.snapshot.params['id'] &&
        this.activatedRoute.snapshot.params['id'] == this.userFormGroup.get('id')?.value) {
        this.store.dispatch(UsersActions.updateUser(this.userFormGroup.getRawValue()));
        this.userFormGroup.setValue({})
        // this.userService.update(this.activatedRoute.snapshot.params['id'], this.userFormGroup.getRawValue());
      } else {
        // this.userService.create(this.userFormGroup.getRawValue());
        this.store.dispatch(UsersActions.createUser(this.userFormGroup.getRawValue()));
      }
    }
    this.router.navigate(['users']);
  }
}
