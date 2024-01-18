import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../models/user";
import {UserService} from "../../../../services/user/user.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {select, Store} from "@ngrx/store";
import {usersList} from "../../../../states/users/users.selectors";
import {UsersActions} from "../../../../states/users/users.actions";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit, AfterViewInit {

  private userService: UserService;
  private router: Router;

  constructor(userService: UserService, router: Router, private store: Store) {
    this.store = store;
    this.router = router;
    this.userService = userService;
  }


  // users$ = this.store.select(usersList);
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'action'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.store.pipe(select(usersList)).subscribe((users) => {
      this.dataSource.data = users;
    });
    this.store.dispatch(UsersActions.loadUsers());
    // this.dataSource.data = this.userService.getAll().reverse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  create() {
    this.router.navigate(['users/add']);
  }

  edit(id: number) {
    this.router.navigate(['users/edit/'+id]);
  }

  delete(id: number) {
    this.userService.delete(id);
  }
}
