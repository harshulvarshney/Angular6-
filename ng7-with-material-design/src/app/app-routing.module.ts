import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyDataTableComponent } from './my-data-table/my-data-table.component';
import { MyFormComponent } from './my-form/my-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  { path: 'table', component: MyDataTableComponent},
  { path: 'form', component: MyFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
