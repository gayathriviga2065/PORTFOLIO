// import { NgModule } from "@angular/core";
// import { RouterModule,Routes } from "@angular/router";
// import { ReactiveFormsModule } from "@angular/forms";
// import { UserSummaryComponent } from './user-summary/user-summary.component';

// const routes:Routes=[
//     {path:'UserSummary',component:UserSummaryComponent}
// ];

// @NgModule({
//     imports:[RouterModule.forChild(routes)],
//     exports:[RouterModule]
// })
// export class UserRoutingModule{}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSummaryComponent } from './user-summary/user-summary.component';

const routes: Routes = [
  { path: '', component: UserSummaryComponent }  // shows by default on /user
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
