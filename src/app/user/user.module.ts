import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserSummaryComponent } from './user-summary/user-summary.component';

@NgModule({
  declarations: [UserSummaryComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule {}

