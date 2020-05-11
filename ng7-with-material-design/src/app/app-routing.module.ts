import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyDataTableComponent } from './my-data-table/my-data-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  { path: 'table', component: MyDataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
