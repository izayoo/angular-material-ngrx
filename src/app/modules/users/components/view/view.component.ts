import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user/user.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {select, Store} from "@ngrx/store";
import {selectUsersList} from "../../../../states/users/users.selectors";
import {UsersActions} from "../../../../states/users/users.actions";
import {Subject, takeUntil} from "rxjs";
import {AppState} from "../../../../states/app.states";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'action'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.store.pipe(select(selectUsersList), takeUntil(this.destroy$)).subscribe((users) => {
      this.dataSource.data = users;
    });

    this.store.dispatch(UsersActions.loadUsers());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  create() {
    this.router.navigate(['users/add']);
  }

  edit(id: number) {
    this.router.navigate(['users/edit/'+id]);
  }

  delete(id: number) {
    if (confirm('Do you really want to delete this user? Warning: This is irreversible.')) {
      this.userService.delete(id);
    }
  }
}
