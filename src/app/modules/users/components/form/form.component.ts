import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(fb: FormBuilder, activatedRoute: ActivatedRoute, userService: UserService,
              router: Router) {
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
    try {
      if (this.userFormGroup.valid) {
        if (this.activatedRoute.snapshot.params['id']) {
          this.userService.update(this.activatedRoute.snapshot.params['id'], this.userFormGroup.getRawValue());
        } else {
          this.userService.create(this.userFormGroup.getRawValue());
        }
      }
      this.router.navigate(['users']);
    } catch (e: any) {
      console.log(e.message);
    }
  }
}
