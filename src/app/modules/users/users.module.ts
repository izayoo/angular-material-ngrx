import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";

const routes: Routes = [
  { path: '', component: ViewComponent, pathMatch: 'full' },
  { path: 'add', component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
];

@NgModule({
  declarations: [
    FormComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    RouterModule
  ]
})
export class UsersModule { }
